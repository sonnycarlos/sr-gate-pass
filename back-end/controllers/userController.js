import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import passwordValidator from 'password-validator'

import { generateOtp, mailer } from '../utils/index.js'

import User from '../models/userModel.js'

dotenv.config()

// @desc    Log in user
// @route   POST /api/login
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
})

// @desc    Register user
// @route   POST /api/registration
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

// @desc    Generate OTP code
// @route   GET /api/verification
// @access  Public
const requestOtp = asyncHandler(async (req, res) => {
  var otpCode = generateOtp()
  var receiver = req.body.emailAddress
  var subject = 'Verify Email Address'
  var body = `Hello!
              <br><br>
              A sign in attempt requires further verification. To complete the sign in, enter the verification code.
              <br><br>
              Your verification code is <b>${otpCode}</b>.`

  await mailer({ receiver, subject, body })
    .then(() => {
      res.status(200).json({ isSuccess: true })
    })
    .catch(error => {
      res.status(400)
      throw new Error(error)
    })
})

// @desc    Verify OTP code
// @route   GET /api/generate-otp
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
  let { otpCode, input } = req.body

  if (otpCode == input) {
    res.status(200).json({ isVerify: true })
  } else {
    res.status(400)
    throw new Error('Invalid code.')
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
  signIn,
  signUp,
  requestOtp,
  verifyOtp,
  getUser
}