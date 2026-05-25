const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'engineering', 'medical', 'civil_services', 'defense', 'law', 
      'management', 'science', 'teaching', 'banking_finance', 'design', 
      'architecture', 'pharmacy', 'nursing', 'agriculture', 
      'hotel_management', 'mass_communication', 'railway', 'ssc', 'state_level'
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
