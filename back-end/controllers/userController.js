import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { emailTemplate, generateOtp, mailer, validatePassword } from '../utils/index.js'
import { Resident, User } from '../models/index.js'

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

  if (user && (await bcrypt.compare(password, user.password[user?.password?.length - 1]))) {
    userEmailAddress = emailAddress
    let token = generateToken(user._id)

    res.cookie('token', token)
    
    res.status(200).json({
      _id: user._id,
      username: user.username,
      emailAddress: user.emailAddress,
      isVerify: user.isVerify,
      isValidate: user.isValidate,
      isRegistrationComplete: user.isRegistrationComplete,
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
      isVerify: false,
      isValidate: false,
      isRegistrationComplete: false
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

// @desc    Forgot password
// @route   GET /api/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { emailAddress, password } = req.body

  if (!emailAddress || !password) {
    res.status(400)
    throw new Error('Input all the fields.')
  }
  
  // Check if user exists
  const userExists = await User.findOne({ emailAddress })

  if (!userExists) {
    res.status(400).json({ errorMessage: `User doesn't exist.` })
    throw new Error(`User doesn't exist.`)
  }

  //  Check if the user used one of the old passwords
  for (let i = 0; i < userExists?.password?.length; i++) {
    if (await bcrypt.compare(password, userExists?.password[i])) {
      res.status(400).json({ errorMessage: 'Your new password cannot be the same as your current or old password.' })
      throw new Error('Your new password cannot be the same as your current or old password.')
    }
  }

  let { isValidate, errorMessage } = validatePassword(password)

  // Validate password with NIST policy
  if (isValidate) {
     // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Update user
    const user = await User.updateOne({ emailAddress }, { $push: {['password']: hashedPassword} })

    if (user) {
      userEmailAddress = emailAddress

      res.status(200).json(user)
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
  const { emailAddressInput, otpCodeInput } = req.body

  if (otpCodeInput == otpCode && emailAddressInput == userEmailAddress) {
    res.status(200).json({ status: 'success' })
  } else {
    res.status(400).json({ errorMessage: 'Invalid code.' })
    throw new Error('Invalid code.')
  }
})

// @desc    Get user data
// @route   GET /api/users/validate
// @access  Public
const validateUser = asyncHandler(async (req, res) => {
  const { _id, username, emailAddress } = await User.findById(req.user._id)

  res.status(200).json({
    _id,
    username,
    emailAddress
  })
})

// @desc    Check if user exists
// @route   GET /api/users/check-user
// @access  Public
const checkUser = asyncHandler(async (req, res) => {
  const { emailAddress } = req.body
  const user = await User.findOne({ emailAddress })
  userEmailAddress = req.body.emailAddress

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(400).json({ errorMessage: `User doesn't exist.` })
    throw new Error(`User doesn't exist.`)
  }
})

// @desc    Check if resident's username already exists
// @route   GET /api/users/check-resident-username
// @access  Public
const checkResidentUsername = asyncHandler(async (req, res) => {
  const { username } = req.body
  const resident = await Resident.findOne({ username })

  if (!resident) {
    res.status(200).json({ message: 'Successfull' })
  } else {
    res.status(400).json({ errorMessage: `Username already exist.` })
    throw new Error(`Username already exist.`)
  }
})

// @desc    Create resident profile
// @route   GET /api/users/create-resident-profile
// @access  Public
const createResidentProfile = asyncHandler(async (req, res) => {
  const { 
    firstName,
    lastName,
    birthdate,
    gender,
    address,
    phoneNumber,
    emailAddress,
    username,
    type,
    landCertificate,
    validId,
    picture
  } = req.body

  // Check if resident profile and username already exists
  const user = await User.findOne({ emailAddress })
  const residentExists = await Resident.findOne({ username })

  if (user) {
    if (user.isVerify) {
      res.status(400).json({ errorMessage: 'User already has a profile.' })
      return
    }

    if (type !== 'homeowner' && type !== 'tenant') {
      res.status(400).json({ errorMessage: 'Invalid resident type.' })
      return
    }

    if (residentExists) {
      res.status(400).json({ errorMessage: 'Username already exists.' })
      return
    }

    await User.updateOne({ emailAddress }, { $set: { isVerify: true } })
    const resident = await Resident.create({
      userId: user._id,
      firstName,
      lastName,
      birthdate,
      gender,
      address,
      phoneNumber,
      type,
      emailAddress,
      username,
      dateCreated: Date.now(),
      landCertificate,
      validId,
      picture
    })

    if (resident) {
      res.status(201).json(resident)
    } else {
      res.status(400).json({ errorMessage: 'Error.' })
      throw new Error('Error.')
    }
  } else {
    res.status(400).json({ errorMessage: `User doesn't exist.` })
    throw new Error(`User doesn't exist.`)
  }
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
  forgotPassword,
  requestOtp,
  verifyOtp,
  validateUser,
  checkUser,
  checkResidentUsername,
  createResidentProfile
}