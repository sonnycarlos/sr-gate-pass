import express from 'express'

import { 
  getUser,
  signIn, 
  signUp 
} from '../controllers/userController.js'
import {
  protect
} from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/logIn', signIn)
router.post('/register', signUp)
router.post('/me', protect, getUser)

export default router