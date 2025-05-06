const mongoose = require('mongoose')

const Course = mongoose.model('Course', {
  name: String,
  track: String,
  schedule: [Number],
  day: [String],
  teacher: String,
  description: String,
})

module.exports = Course