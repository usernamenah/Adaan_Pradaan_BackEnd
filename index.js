const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config();
const login=require('./Auth_Student');
const add_lab=require('./create_labs_managaement');
const Show_labs_to_student =require('./Show_labs_to_students');
const login_management=require('./Auth_management');

const mongoose = require('mongoose');
//middleware
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(bodyParser.json());
require('dotenv').config();
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to MongoDB
 mongoose.connect(process.env.dbUrl, connectionParams)
    .then(async () => {
        console.info("Connected to the DB");
    })
    .catch((error) => {
        console.error("Error connecting to the DB:", error);
    });

//Routes
app.use("/api",login);
app.use("/api",add_lab);
app.use("/api",login_management);
app.use("/api",Show_labs_to_student);

// app.use("/api",collegeRouters);

const port=process.env.PORT || 4000;
app.listen(port,()=>{console.log(`server is running on ${port}`)});