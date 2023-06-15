import express from 'express'

import { 
  checkUser,
  createResidentProfile,
  forgotPassword,
  requestOtp,
  signIn, 
  signUp, 
  validateUser,
  verifyOtp
} from '../controllers/userController.js'

import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/login', signIn)
router.post('/registration', signUp)
router.post('/forgot-password', forgotPassword)
router.post('/generate-otp', requestOtp)
router.post('/verification', verifyOtp)
router.post('/validate-user', protect, validateUser)
router.post('/check-user', checkUser)
router.post('/create-resident-profile', protect, createResidentProfile)

export default router