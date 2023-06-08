import mongoose from 'mongoose'

const residentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  username: {
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
  landCertificate: [String],
  validId: [String],
  numOfGuests: number
})

export default mongoose.model('Resident', residentSchema)