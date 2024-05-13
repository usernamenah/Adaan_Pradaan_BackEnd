const express = require('express');
const Management =require('./models/ManagementModel')
const bcrypt=require('bcrypt');
const router = express.Router();
require('dotenv').config();
router.post('/login_management', async (req, res) => {
  try {
    const { email, password ,idno} = req.body;

    // Input validation
    if (!email || !password || !idno) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Find student by email
    const student = await Management.findOne({ email });

    // Check if student exists
    if (!student) {
        // Delay response to obscure whether the email exists
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isidValid = await bcrypt.compare(idno, student.idno);

    if (!isidValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Successful login 
    res.json({ email: student.email , college : student.college , booked: student.booked });

} catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
}
});
router.post('/register_management', async (req, res) => {
  try {
      // Extracting required fields from request body
      const { email, college, idno , password , booked } = req.body;

      console.log(req.body);
      // Check if the email is already registered
      const existingStudent = await Management.findOne({email :email});

      if (existingStudent) {
        return res.status(401).send({error:'Email already exists'});
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPassword1 = await bcrypt.hash(idno, 10);

      // Create a new student document
      const newManagement = new Management({
          email,
          college,
          idno:hashedPassword1,
          password: hashedPassword,
          booked,
          
      });

      // Save the student document to the database
      await newManagement.save();
      console.log(newManagement);
      // Respond with success message
      res.status(201).json({ newManagement });
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
  }
});


// router.post('/updatethemanagementbooked', async (req, res) => {
//     try {

//         // Extracting required fields from request body

//         const { email, college, booked1 } = req.body;
  
//         console.log(req.body);

//         // Check if the email is already registered

//         const updatedStudent = await Management.findOneAndUpdate(
//             { email: email, college: college },
//             { booked: updatedStudent.booked + booked1 }
            
//         );
  
//         if (!existingStudent) {
//             return res.status(400).json({ message:'not found..!!' });
//         }
  
  
//         // Save the student document to the database
//         await newStudent.save();
//         console.log(newStudent);
//         // Respond with success message
//         res.status(201).json({ message : 'booked succesfully', booked:updatedStudent.booked });
//     } catch (error) {
//         console.error('Error occurred:', error);
//         res.status(500).send('Internal Server Error');
//     }
//   });
router.put('/updatethemanagementbooked', async (req, res) => {
    try {
        // Extracting required fields from request body
        const { email, college, booked1 } = req.body;
        console.log(booked1);
        console.log(email);
      const existingStudent1 = await Management.findOne({email :email});
        
        // Check if the student exists
        const existingStudent = await Management.findOneAndUpdate(
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
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
