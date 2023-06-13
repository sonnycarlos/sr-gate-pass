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
    let token = generateToken(user._id)

    res.cookie('token', token)
    
    res.status(200).json({
      _id: user._id,
      username: user.username,
      emailAddress: user.emailAddress,
      token
    })
  } else {
    res.status(400).json({ errorMessage: 'Invalid username or password.' })
    throw new Error('Invalid username or password.')
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
    res.status(400).json({ errorMessage: 'User already exists.' })
    throw new Error('User already exists.')
  }

  let { isValidate, errorMessage } = validatePassword(password)

  // Validate password with NIST policy
  if (isValidate) {
     // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      type: 'resident',
      emailAddress,
      password: hashedPassword,
      dateCreated: Date.now(),
      isVerify: false
    })

    if (user) {
      userEmailAddress = emailAddress

      res.status(201).json({
        _id: user._id,
        emailAddress: user.emailAddress,
        token: generateToken(user._id)
      })
    } else {
      res.status(400).json({ errorMessage: 'Invalid user data.' })
      throw new Error('Invalid user data.')
    }
  } else {
    res.status(400).json({ errorMessage })
    throw new Error(errorMessage)
  }
})

// @desc    Generate OTP code
// @route   GET /api/verification
// @access  Public
const requestOtp = asyncHandler(async (req, res) => {
  otpCode = generateOtp()

  var action = req.body.action
  var receiver = req.body.receiver
  var subject = 'Verify Email Address'
  var body = emailTemplate(action, otpCode)

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

  if (otpCodeInput == otpCode && emailAddressInput == userEmailAddress) {
    res.status(200).json({ status: 'success' })
  } else {
    res.status(400).json({ errorMessage: 'Invalid code.' })
    throw new Error('Invalid code.')
  }
})

// @desc    Get user data
// @route   GET /api/users/validate
// @access  Private
const validateUser = asyncHandler(async (req, res) => {
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
    expiresIn: '14d'
  })
}

export {
  signIn,
  signUp,
  requestOtp,
  verifyOtp,
  validateUser
}