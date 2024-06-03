const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require("morgan");
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const login = require('./Auth_Student');
const add_lab = require('./create_labs_managaement');
const login_management = require('./Auth_management');

app.use(cors({
    origin: 'https://adaan-pradaan-front-egorke4q2-usernamenahs-projects.vercel.app'
}));
app.use(logger("dev"));

// Middleware
app.use(express.json());




const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};



// Connect to MongoDB
mongoose.connect(process.env.dbUrl, connectionParams)
    .then(() => {
        console.info("Connected to the DB");
    })
    .catch((error) => {
        console.error("Error connecting to the DB:", error);
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes
app.get("/", (req, res) => {
  res.send("Adan_Pradhan server is running!");
});

app.use("/api", login);
app.use("/api", add_lab);
app.use("/api", login_management);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
