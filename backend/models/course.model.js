const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: String,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
