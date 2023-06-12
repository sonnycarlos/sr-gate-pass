import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'

dotenv.config()

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.cookies.token) {
    try {
      // Get token
      token = req.cookies.token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized. No token.')
  }
})

export {
  protect
}