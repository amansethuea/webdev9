const env = process.env.NODE_ENV || 'development';

// import database configurations 
const config = require('./config.js')[env];

const express = require('express')
const app = express();
const port = 3000;

// import JSON validator
const validate = require('express-jsonschema').validate;

/// sanitize the data //
const sanitizer = require('express-html-sanitizer');
const sanitizeReqBody = sanitizer();

/// load PG library
const pg = require('pg');

const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();

app.use(express.static('Hotel_Management_System'));

// use json body parser by default
app.use(bodyParser.json());

// use express html sanitizer
app.use(sanitizeReqBody);

/* landing page GET request */
app.get('/', (req, res) => {
    /// send the static file 
    res.sendFile('', (err) => {
        if (err){
            console.log(err);
        }
    })
  });

/* GET booking details data from database */
app.get('/refno', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();
        const q = 'select * from hotelbooking.roombooking;'
        await client.query(q, (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();
                // console.log(results); //
                data = results.rows;
                count = results.rows.length;
                res.json({ results: data, rows: count });
            }
        });

    } catch (e) {
        console.log(e);
    }
});

// handling errors // 
app.use(function (err, req, res, next) {
    let responseData;
    if (err.name === 'JsonSchemaValidation') {
        // Log the error however you please
        console.log(err.message);
        // logs "express-jsonschema: Invalid data found"

        // Set a bad request http response status or whatever you want
        res.status(400);

        // Format the response body however you want
        responseData = {
            statusText: 'Bad Request',
            jsonSchemaValidation: true,
            validations: err.validations  // All of your validation information
        };

        // Take into account the content type if your app serves various content types
        if (req.xhr || req.get('Content-Type') === 'application/json') {
            res.json(responseData);
        } else {
            // If this is an html request then you should probably have
            // some type of Bad Request html template to respond with
            res.render('badrequestTemplate', responseData);
        }
    } else {
        // pass error to next error middleware handler
        next(err);
    }
});

app.listen(port, () => {
    console.log(`My first app listening on port ${port}!`)
});