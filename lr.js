const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Student = require('./models/StudentModel');

router.post('/register', async (req, res) => {
    try {
        // Extracting required fields from request body
        const { email, college, Roll_no, password, section, year } = req.body;

        // Check if the email is already registered
        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student document
        const newStudent = new Student({
            email,
            college,
            Roll_no,
            password: hashedPassword,
            section,
            year
        });

        // Save the student document to the database
        await newStudent.save();

        // Respond with success message
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
