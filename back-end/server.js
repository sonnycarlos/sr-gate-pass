import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import dbConnect from './config/database.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

dbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', userRoutes)

app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello World' })
})

app.listen(port, () => console.log(`Server started on port ${port}`))