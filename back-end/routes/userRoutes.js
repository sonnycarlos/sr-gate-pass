import express from 'express'

import { 
  checkResidentUsername,
  checkUser,
  forgotPassword,
  requestOtp,
  signIn, 
  signUp, 
  validateUser,
  verifyOtp,
  verifyUser
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
router.post('/check-resident-username', checkResidentUsername)
router.post('/verify-user', protect, verifyUser)

export default router