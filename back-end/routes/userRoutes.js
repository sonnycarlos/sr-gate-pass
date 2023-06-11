import express from 'express'

import { 
  signIn, 
  signUp, 
  requestOtp,
  verifyOtp,
  getUser
} from '../controllers/userController.js'

import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/login', signIn)
router.post('/registration', signUp)
router.post('/generate-otp', requestOtp)
router.post('/verification', verifyOtp)
router.post('/me', protect, getUser)

export default router