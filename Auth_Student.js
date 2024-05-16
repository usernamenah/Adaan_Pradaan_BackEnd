const express = require('express');
const Student =require('./models/StudentModel')
const bcrypt=require('bcrypt');
const router = express.Router();
require('dotenv').config();
router.post('/login', async (req, res) => {    
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Find student by email
    const student = await Student.findOne({ email });

    // Check if student exists
    if (!student) {
        // Delay response to obscure whether the email exists
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
   
    
    res.json({ email: student.email, college: student.college , section: student.section , year: student.year , booked : student.booked });

} catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
}
});
router.post('/register', async (req, res) => {
  try {
      // Extracting required fields from request body
      const { email, college, Roll_no, password, section, year , booked } = req.body;

      console.log(req.body);
      // Check if the email is already registered
      const existingStudent = await Student.findOne({email :email});

      if (existingStudent) {
          return res.status(400).json({ existingStudent });
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
          year,
          booked
      });

      // Save the student document to the database
      await newStudent.save();
      console.log(newStudent);
      // Respond with success message
      res.status(201).json({ message : 'registerd succesfully' });
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
  }
});
router.put('/updatethestudentbooked', async (req, res) => {
    try {
        // Extracting required fields from request body
        const { email, college, booked1 , section,year   } = req.body;
        console.log(booked1);
        console.log(email);
        console.log(year);
        console.log(section);
      const existingStudent1 = await Student.findOne({
        email :email,
        college : college,
        year : year,
        section: section,

    });
        
        // Check if the student exists
        const existingStudent = await Student.findOneAndUpdate(
            { email: email, college: college },
            { $set: { booked: existingStudent1.booked+"~"+booked1 } },
            { new: true } 
        ); 
  
        if (!existingStudent) {
            return res.status(400).json({ message: 'Student not found..!!' , data: existingStudent.booked });
        }
  
        // Respond with success message
        res.status(201).json({ message: 'Booked successfully', booked: existingStudent.booked });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error sujith');
    }
});
// router.post('/updatethestudentbooked', async (req, res) => {
//     try {
//         // Extracting required fields from request body
//         const { email, college, Roll_no, password, section, year , booked } = req.body;
  
//         console.log(req.body);
//         // Check if the email is already registered
//         const existingStudent = await Student.findOne({email :email});
  
//         if (existingStudent) {
//             return res.status(400).json({ existingStudent });
//         }
  
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
  
//         // Create a new student document
//         const newStudent = new Student({
//             email,
//             college,
//             Roll_no,
//             password: hashedPassword,
//             section,
//             year,
//             booked
//         });
  
//         // Save the student document to the database
//         await newStudent.save();
//         console.log(newStudent);
//         // Respond with success message
//         res.status(201).json({ message : 'registerd succesfully' });
//     } catch (error) {
//         console.error('Error occurred:', error);
//         res.status(500).send('Internal Server Error');
//     }
//   });

module.exports = router;
