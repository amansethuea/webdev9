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

app.use(express.static('public'));

// use json body parser by default
app.use(bodyParser.json());

// use express html sanitizer
app.use(sanitizeReqBody);


const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            console.log(err);
        }
    });
});

/* landing page GET request */
app.get('/:userType', (req, res) => {
    let userType = req.params.userType;
    if (['Customer', 'Housekeeper', 'Receptionist'].includes(userType)) {
        res.sendFile(path.join(__dirname, 'public', userType, 'index.html'), (err) => {
            if (err) {
                console.log(err);
            }
        });
    } else {
        res.status(400).send('Invalid user type');
    }
});

/* GET booking details data from database - Receptionist*/
app.get('/receptionist/refno', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const { b_ref } = req.query;
        const q = 'select r_no, checkin, checkout from hotelbooking.roombooking where b_ref = $1;';
        await client.query(q, [b_ref], (err, results) => {
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

/* GET available rooms within selected dates - Receptionist*/
app.get('/receptionist/roomavailability', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const { checkin_date } = req.query;
        const { checkout_date } = req.query;
        const q =
            'select distinct(hotelbooking.room.r_no), hotelbooking.room.r_class from hotelbooking.room, hotelbooking.roombooking where hotelbooking.roombooking.r_no not in (select hotelbooking.roombooking.r_no from hotelbooking.roombooking where (checkin <= $1 and checkout >= $2) and hotelbooking.room.r_no = hotelbooking.roombooking.r_no);';
        await client.query(q, [checkin_date, checkout_date], (err, results) => {
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

/* GET available rooms within selected dates - Customer*/
app.get('/customer/roomavailability', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const { checkin_date } = req.query;
        const { checkout_date } = req.query;
        const { room_type } = req.query;
        const q =
            'select r_no FROM (select distinct(hotelbooking.room.r_no), hotelbooking.room.r_class from hotelbooking.room, hotelbooking.roombooking where hotelbooking.roombooking.r_no not in( select hotelbooking.roombooking.r_no from hotelbooking.roombooking where(checkin <=$1 and checkout>= $2) and hotelbooking.room.r_no = hotelbooking.roombooking.r_no)) AS room_details WHERE r_class = $3;';
        await client.query(q, [checkin_date, checkout_date, room_type], (err, results) => {
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

/* GET booking data on checkout - Receptionist*/
app.get('/receptionist/checkoutdetails', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const { b_ref } = req.query;
        const { checkout_date } = req.query;
        console.log(b_ref);
        console.log(checkout_date);
        const q = `select distinct(hotelbooking.customer.c_name), hotelbooking.roombooking.checkin, hotelbooking.roombooking.checkout, hotelbooking.booking.b_cost, hotelbooking.booking.b_outstanding, hotelbooking.room.r_class from hotelbooking.customer, hotelbooking.booking, hotelbooking.roombooking, hotelbooking.room  where hotelbooking.customer.c_no = hotelbooking.booking.c_no  and hotelbooking.room.r_no = hotelbooking.roombooking.r_no and hotelbooking.booking.b_ref = ${b_ref} and hotelbooking.roombooking.checkout = '${checkout_date}';`;
        await client.query(q, (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();
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