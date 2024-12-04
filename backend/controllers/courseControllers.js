const Course = require('../models/course.model');


exports.addCourse = async (req, res) => {
  const { role } = req.user || {};  // Safely destructure role from req.user
  
  // Check if the user has the required role
  if (role !== 'superuser' && role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to add courses' });
  }

  const { name, description, duration } = req.body;

  try {
    // Check if all required fields are present
    if (!name || !description || !duration) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new course instance
    const course = new Course({ name, description, duration });

    // Save the course to the database
    await course.save();

    // Respond with the created course
    res.status(201).json(course);
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).json({ message: 'Error adding course', error: err.message });
  }
};


// router.post('/', verifyToken, (req, res) => {
//   const { role } = req.user;
//   if (role !== 'superuser' && role !== 'admin') {
//     return res.status(403).json({ message: 'Not authorized to add courses' });
//   }
//   addCourse(req, res); // Add course function
// });



exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err });
  }
};

