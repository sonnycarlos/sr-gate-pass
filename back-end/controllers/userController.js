import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { emailTemplate, generateOtp, mailer, validatePassword } from '../utils/index.js'
import { User } from '../models/index.js'

dotenv.config()

var otpCode
var userEmailAddress

// @desc    Log in user
// @route   POST /api/login
// @access  Public
const signIn = asyncHandler(async (req, res) => {
  const { emailAddress, password } = req.body

  // Check if user exists
  const user = await User.findOne({ emailAddress })

  if (user && (await bcrypt.compare(password, user.password[0]))) {
    userEmailAddress = emailAddress

    console.log(`Email address -> ${userEmailAddress}`)
    
    res.status(200).json({
      _id: user._id,
      username: user.username,
      emailAddress: user.emailAddress,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).json({ errorMessage: 'Invalid username or password.' })
    throw new Error('Invalid credentials.')
  }
})

// @desc    Register user
// @route   POST /api/registration
// @access  Public
const signUp = asyncHandler(async (req, res) => {
  const { type, emailAddress, password } = req.body

  if (!type || !emailAddress || !password) {
    res.status(400)
    throw new Error('Input all the fields.')
  }

  // Check if user exists
  const userExists = await User.findOne({ emailAddress })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists.')
  }

  // Validate password with NIST policy
  if (validatePassword(password)) {
     // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      type: 'resident',
      emailAddress,
      password: hashedPassword,
      dateCreated: Date.now()
    })

    if (user) {
      userEmailAddress = emailAddress

      res.status(201).json({
        _id: user._id,
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
  var action = req.body.action
  otpCode = generateOtp()
  var receiver = req.body.emailAddress
  var subject = 'Verify Email Address'
  var body = emailTemplate(otpCode, action)

  await mailer({ receiver, subject, body })
    .then(() => {
      res.status(200).json({ 
        status: 'success',
        otpCode: otpCode 
      })
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
  let { emailAddressInput, otpCodeInput } = req.body

  if (otpCodeInput == otpCode && emailAddressInput === userEmailAddress) {
    res.status(200).json({ status: 'success' })
  } else {
    res.status(400)
    throw new Error('Invalid input.')
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