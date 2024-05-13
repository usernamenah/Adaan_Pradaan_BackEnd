const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
    college: {
    type: String,
  },
  password: {
    type: String,
    required:true
  },
  section: {
    type: String,
  },
  year: {
    type: String,
  },
  booked:{
    type:String,
  },
  
  
});

// Define mongoose model
const Student = mongoose.model("Student", postSchema);

module.exports=Student;