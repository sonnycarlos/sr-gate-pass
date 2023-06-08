import mongoose from 'mongoose'

const guestSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Resident'
  }
})

export default mongoose.model('Guest', guestSchema)