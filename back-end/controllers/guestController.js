import asyncHandler from 'express-async-handler'

import { 
  Guest,
  User 
} from '../models/index.js'

// @desc    Fetch guests
// @route   GET /api/guest/fetch-guests
// @access  Public
const fetchGuests = asyncHandler(async (req, res) => {
  const { userId } = req.body

  const guests = await Guest.find({ host: userId })
  
  return res.status(200).json(guests)
})

// @desc    Fetch guest
// @route   GET /api/guest/fetch-guest
// @access  Public
const fetchGuest = asyncHandler(async (req, res) => {
  const { id } = req.body

  const guest = await Guest.findOne({ _id: id })

  return res.status(200).json(guest)
})

// @desc    Check if guest exists
// @route   GET /api/guest/check-if-guest-exists
// @access  Public
const checkIfGuestExists = asyncHandler(async (req, res) => {
  const { 
    name,
    phoneNumber,
    emailAddress
  } = req.body

  // Check if user exists
  const user = await User.findOne({ emailAddress })
  
  // Check if guest exists
  const guestExists = await Guest.findOne({ name, phoneNumber, host: user._id })

  if (!user) {
    res.status(400).json({ errorMessage: `User doesn't exist.` })
    throw new Error(`User doesn't exist.`)
  }

  if (guestExists) {
    return res.status(200).json(guestExists)
  }
  
  res.status(400).json({ message: 'Guest does not exist' })
})

// @desc    Book guest
// @route   GET /api/guest/book-guest
// @access  Public
const bookGuest = asyncHandler(async (req, res) => {
  const { 
    name,
    phoneNumber,
    qrCodeImage,
    pin,
    emailAddress
  } = req.body

  if (!name || !phoneNumber || !pin) {
    res.status(400)
    throw new Error('Input all the fields.')
  }

  // Check if user exists
  const user = await User.findOne({ emailAddress })

  if (!user) {
    res.status(400).json({ errorMessage: `User doesn't exist.` })
    throw new Error(`User doesn't exist.`)
  }

  // Check if guest exists
  const guestExists = await Guest.findOne({ name, phoneNumber, host: user._id })
  
  if (guestExists) {
    const guest = await Guest.updateOne(
      { _id: guestExists._id }, 
      { 
        $set: { pin },
        $push: { ['dateBooked']: Date.now() } 
      }
    )

    if (guest.modifiedCount > 0) {
      const guestRes = await Guest.findOne({ _id: guestExists._id })
      return res.status(200).json(guestRes)
    } else {
      res.status(400).json({ errorMessage: `Error. There's a problem encountered.` })
      throw new Error(`Error. There's a problem encountered.`)
    }
  }

  const guest = await Guest.create({
    host: user._id,
    name,
    phoneNumber,
    dateBooked: Date.now(),
    qrCodeImage,
    pin
  })

  const result = await Guest.updateOne({ _id: guest._id }, { $set: { urlLink: `localhost:3000/${guest._id}` } })

  if (result) {
    res.status(200).json({ guest })
  } else {
    res.status(400).json({ errorMessage: `Error. There's a problem encountered.` })
    throw new Error(`Error. There's a problem encountered.`)
  }
})

export {
  fetchGuests,
  fetchGuest,
  bookGuest,
  checkIfGuestExists
}