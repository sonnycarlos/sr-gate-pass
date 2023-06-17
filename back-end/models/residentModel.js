import mongoose from 'mongoose'

const residentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
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
  phoneNumber: {
    type: String,
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
  dateCreated: {
    type: Date,
    required: true
  },
  landCertificate: [{
    name: String,
    size: Number
  }],
  validId: [{
    name: String,
    size: Number
  }],
  picture: {
    type: Object,
  },
  numOfGuests: Number
})

export default mongoose.model('Resident', residentSchema)