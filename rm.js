const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const lab=require('./Models/Labs');

const router = express.Router();

// Routes
router.post("/sellers/postdata", async (req, res) => {
  try {
    console.log(req.body);
    const { year,branch,subject,date,college } = req.body;
    const newSellPost = new SellPost(req.body);
    const savedSellPost = await newSellPost.save();
    res.status(201).json(savedSellPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = router;