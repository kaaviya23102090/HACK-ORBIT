const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  interests: [String],
  marks: {
    math: Number,
    science: Number,
    english: Number,
    social: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);
