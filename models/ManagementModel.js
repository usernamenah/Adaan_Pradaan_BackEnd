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
  idno: {
    type: String,
  },
  booked: {
    type: String,
  },
  studentbooked: {
    type: String,
  },
});

// Define mongoose model
const Management = mongoose.model("management_login", postSchema);

module.exports=Management;