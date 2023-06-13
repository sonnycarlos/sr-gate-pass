import express from 'express'

import { 
  signIn, 
  signUp, 
  forgotPassword,
  requestOtp,
  verifyOtp,
  validateUser
} from '../controllers/userController.js'

import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/login', signIn)
router.post('/registration', signUp)
router.post('/forgot-password', forgotPassword)
router.post('/generate-otp', requestOtp)
router.post('/verification', verifyOtp)
router.post('/validate-user', protect, validateUser)

export default router