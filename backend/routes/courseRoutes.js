const express = require('express');
const { addCourse, getCourses } = require('../controllers/courseControllers');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',verifyToken, addCourse);
router.get('/', getCourses);

module.exports = router;
