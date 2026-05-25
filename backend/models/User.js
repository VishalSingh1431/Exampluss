const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paper'
  }],
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paper'
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
