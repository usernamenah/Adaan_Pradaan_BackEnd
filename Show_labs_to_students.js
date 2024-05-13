const express = require('express');
const LabsInsert = require('./models/LabsInsertModel');
const router = express.Router();
require('dotenv').config();

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