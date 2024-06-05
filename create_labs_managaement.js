const express = require('express');
const LabsInsert = require('./models/LabsInsertModel');
const bcrypt = require('bcrypt');
const router = express.Router();
require('dotenv').config();

router.post('/add_lab', async (req, res) => {
    try {
        const { year, branch, subject, date, college, deleted } = req.body;
    
        // Check for required fields
        if (!year || !branch || !subject || !date || !college) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        // Check for existing lab (assuming a unique constraint on year, branch, subject, date, and college)
        const existingLab = await LabsInsert.findOne({ year, branch, subject, date, college });
    
        if (existingLab) {
          return res.status(409).send({ error: 'Lab already exists' });
        }
    
        // Create and save new lab document
        const newLabsInsert = new LabsInsert({
          year,
          branch,
          subject,
          date,
          college,
          deleted
        });
    
        await newLabsInsert.save();
    
        res.status(201).json({ message: 'Lab added successfully' });
      } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
      }
//     try {
//     const { year, branch, subject, date, college, deleted } = req.body;

//     // Check for required fields
//     if (!year || !branch || !subject || !date || !college) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Check for existing lab (assuming a unique constraint on year, branch, subject, date, and college)
//     const existingLab = await LabsInsert.findOne({ year, branch, subject, date, college });

//     if (existingLab) {
//       return res.status(409).send({ error: 'Lab already exists' });
//     }

//     // Create and save new lab document
//     const newLabsInsert = new LabsInsert({
//       year,
//       branch,
//       subject,
//       date,
//       college,
//       deleted
//     });

//     await newLabsInsert.save();

//     res.status(201).json({ message: 'Lab added successfully' });
//   } catch (error) {
//     console.error('Error occurred:', error);
//     res.status(500).send('Internal Server Error');
//   }
});


router.get('/showlabstostudent', async (req, res) => {
    try {
      // Fetch data from MongoDB
      const data = await LabsInsert.find();
      const reversedData = data.reverse();
      console.log(data);
      console.log("-------");
      console.log(reversedData);
  
      // Send the data as JSON response
      res.status(201).json(reversedData);
    } catch (err) {
      console.error('Error occurred:', err);
      res.status(500).send('Internal Server Error');
    } finally {
      
    }
  });

module.exports = router;
