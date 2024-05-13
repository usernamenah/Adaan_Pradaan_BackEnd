const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    year:{
        type:String,
    },
    branch:{
      type:String,
    },
    subject:{
      type:String,
    },
    date:{
        type:String,
    },
    college:{
       type:String,
    },
    deleted:{
      type:String,
   },
   
   
});

// Define mongoose model
const LabsInsert = mongoose.model("LabsInsert", postSchema);

module.exports=LabsInsert;