const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Save student data
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student saved successfully', student });
  } catch (error) {
    res.status(400).json({ message: 'Error saving student', error });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
});

module.exports = router;
