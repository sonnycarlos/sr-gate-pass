import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import passwordValidator from 'password-validator'

import User from '../models/userModel.js'

dotenv.config()

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const signIn = asyncHandler(async (req, res) => {
  const { emailAddress, password } = req.body

  // Check if user exists
  const user = await User.findOne({ emailAddress })

  if (user && (await bcrypt.compare(password, user.password[0]))) {
    res.json({
      _id: user._id,
      username: user.username,
      emailAddress: user.emailAddress,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials.')
  }

  res.status(200).json({ message: 'Log in' })
})

// @desc    Register user
// @route   POST /api/users
// @access  Public
const signUp = asyncHandler(async (req, res) => {
  const { type, username, emailAddress, password } = req.body

  if (!type || !username || !emailAddress || !password) {
    res.status(400)
    throw new Error('Input all the fields.')
  }

  // Check if user exists
  const userExists = await User.findOne({ emailAddress })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists.')
  }

  // Validate password using NIST policy
  const schema = new passwordValidator()

  if (!schema.is().min(8).validate(password)) {
    res.status(400)
    throw new Error('Password must be minimum of 8 characters')
  }

  if (!schema.is().max(100).validate(password)) {
    res.status(400)
    throw new Error('Password must be maximum of 24 characters')
  }

  if (!schema.has().lowercase().validate(password)) {
    res.status(400)
    throw new Error('Password must have at least one lowercase letter')
  }

  if (!schema.has().uppercase().validate(password)) {
    res.status(400)
    throw new Error('Password must have at least one uppercase letter')
  }

  if (!schema.has().digits().validate(password)) {
    res.status(400)
    throw new Error('Password must have at least one digit')
  }

  if (!schema.has().symbols().validate(password)) {
    res.status(400)
    throw new Error('Password must have at least one special character')
  }

  if (!schema.has().not().spaces().validate(password)) {
    res.status(400)
    throw new Error('Password should not contain spaces')
  }

  if (schema.validate(password)) {
     // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      username,
      type: 'resident',
      emailAddress,
      password: hashedPassword,
      dateCreated: Date.now()
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        emailAddress: user.emailAddress,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data.')
    }
  } else {
    res.status(400)
    throw new Error('Invalid password')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, username, emailAddress } = await User.findById(req.user._id)

  res.status(200).json({
    _id,
    username,
    emailAddress
  })
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export {
  getUser,
  signIn,
  signUp
}