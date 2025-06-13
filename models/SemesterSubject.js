const mongoose = require('mongoose');

const SemesterSubjectSchema = new mongoose.Schema({
  name: String,
  track: String,
  teacher: String,
  semester: Number,
  startDate: String,
  endDate: String,
  schedule: [
    {
      day: String,
      timeCode: String,
      startTime: String,
      endTime: String
    }
  ],
  credits: Number,        
  workload: String,      
  description: String
});

module.exports = mongoose.model('SemesterSubject', SemesterSubjectSchema);