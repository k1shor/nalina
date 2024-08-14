const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.models.User || mongoose.model("User", userSchema)

