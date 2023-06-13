import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  password: [String],
  dateCreated: {
    type: Date,
    required: true
  },
  isVerify: {
    type: Boolean,
    required: true
  }
})

export default mongoose.model('User', userSchema)