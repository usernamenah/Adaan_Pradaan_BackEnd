const express = require('express');
const LabsInsert = require('./models/LabsInsertModel');
const bcrypt = require('bcrypt');
const router = express.Router();
require('dotenv').config();

router.post('/add_lab', async (req, res) => {
    try {
        // Extracting required fields from request body
        const { year, branch, subject, date, college , deleted } = req.body;
        console.log(req.body);
        // Check if all fields are provided
        if (!year || !branch || !subject || !date || !college ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the lab already exists
        const existingLab = await LabsInsert.findOne({
            year,
            branch,
            subject,
            date,
            college,
            
        });

        if (existingLab) {
            
            // If lab exists, return error

            return res.status(409).send({ error: 'Lab already exists' });
            
        }

        // Create a new lab document
        const newLabsInsert = new LabsInsert({
            year,
            branch,
            subject,
            date,
            college,
            deleted
        });

        // Save the lab document to the database
        await newLabsInsert.save();
        console.log(newLabsInsert);

        // Respond with success message
        res.status(201).json({ message: 'Lab added successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
    }
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
