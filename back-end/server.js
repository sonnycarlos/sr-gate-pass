import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import dbConnect from './config/database.js'
import { guestRoutes, userRoutes } from './routes/index.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Database Connection
dbConnect()

// Middlewares
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// User Routes
app.use('/api/user', userRoutes)

// Guest Routes
app.use('/api/guest', guestRoutes)

app.get('/api/hello', (res) => {
  res.status(200).json({ message: 'Hello World' })
})

app.listen(port, () => console.log(`Server started on port ${port}`))