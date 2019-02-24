const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan')

const db = require("./db");

const app = express();

// MIDDLEWARE
app.use(morgan('combined'))
app.use(bodyParser.json()); // parses json data sent to us by the user 

const routes = require('./routes');

app.use('/api', routes);

// Middleware for handling Error
// Sends Error Response Back to User
app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message
        }
    });
})

db.connect((err) => {
    // If err unable to connect to database
    // End application
    if (err) {
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else {
        app.db = db;
        app.listen(3000, () => {
            console.log('Connected to database, app listening on port 3000');
        });
    }
});