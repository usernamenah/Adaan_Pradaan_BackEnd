const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const login = require('./Auth_Student');
const add_lab = require('./create_labs_managaement');
const login_management = require('./Auth_management');

// CORS configuration
app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(process.env.dbUrl, connectionParams)
    .then(() => {
        console.info('Connected to the DB');
    })
    .catch((error) => {
        console.error('Error connecting to the DB:', error);
    });

// Routes
app.get('/', (req, res) => {
    res.send('Adan_Pradhan server is running!');
});

app.use('/api', login);
app.use('/api', add_lab);
app.use('/api', login_management);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const logger = require("morgan");
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();

// // Import routes
// const login = require('./Auth_Student');
// const add_lab = require('./create_labs_managaement');
// const login_management = require('./Auth_management');

// app.use(cors({
//     origin: 'https://adaan-pradaan-front-egorke4q2-usernamenahs-projects.vercel.app'
// }));
// app.use(logger("dev"));

// // Middleware
// app.use(express.json());




// const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };



// // Connect to MongoDB
// mongoose.connect(process.env.dbUrl, connectionParams)
//     .then(() => {
//         console.info("Connected to the DB");
//     })
//     .catch((error) => {
//         console.error("Error connecting to the DB:", error);
//     });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// // Routes
// app.get("/", (req, res) => {
//   res.send("Adan_Pradhan server is running!");
// });

// app.use("/api", login);
// app.use("/api", add_lab);
// app.use("/api", login_management);

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log(`Server is running on ${port}`);
// });
