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
        const { checkin_date } = req.query;
        const { checkout_date } = req.query;
        const q = 'select distinct(hotelbooking.customer.c_name), hotelbooking.booking.b_ref, hotelbooking.roombooking.checkin, hotelbooking.roombooking.checkout, hotelbooking.booking.b_cost, hotelbooking.booking.b_outstanding from hotelbooking.customer, hotelbooking.booking, hotelbooking.roombooking, hotelbooking.room where hotelbooking.customer.c_no = hotelbooking.booking.c_no and hotelbooking.room.r_no = hotelbooking.roombooking.r_no and hotelbooking.booking.b_ref = $1 and (hotelbooking.roombooking.checkin = $2 and hotelbooking.roombooking.checkout = $3);';
        await client.query(q, [b_ref, checkin_date, checkout_date], (err, results) => {
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
        const q = `select distinct(hotelbooking.customer.c_name), hotelbooking.roombooking.checkin, hotelbooking.roombooking.checkout, hotelbooking.booking.b_cost, hotelbooking.booking.b_outstanding from hotelbooking.customer, hotelbooking.booking, hotelbooking.roombooking, hotelbooking.room  where hotelbooking.customer.c_no = hotelbooking.booking.c_no  and hotelbooking.room.r_no = hotelbooking.roombooking.r_no and hotelbooking.booking.b_ref = ${b_ref} and hotelbooking.roombooking.checkout = '${checkout_date}' limit 1;`;
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


// Insert a new customer record with the booking in the DB - Customer
app.post('/api/customer/newbooking', async (req, res) => {
    try {

        const bookingDetails = JSON.parse(localStorage.getItem("roomDetails"));
        const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
        const getPaymentDetails = JSON.parse(localStorage.getItem("setPaymentDetails"));

        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const latestCustNoQuery = 'SELECT MAX(c_no) FROM hotelbooking.customer;';
        await client.query(latestCustNoQuery, async (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();

                const latestCustNumber = results.rows[0].max || 0; // Fetch the latest customer number
                newCustomerNumber = latestCustNumber + 1; // Create latest or new customer number

                const customerName = getPaymentDetails.full_name;
                const customerEmail = getPaymentDetails.email;
                const customerAddr = getPaymentDetails.address + "," + getPaymentDetails.city + "," + getPaymentDetails.state + "," + getPaymentDetails.zip;
                const customerCardType = 'V';
                const customerCardExpMonth = getPaymentDetails.card_expiry_month;
                const customerCardExpYear = getPaymentDetails.card_expiry_year;
                const cardExpMonthYear = customerCardExpMonth + "/" + customerCardExpYear;
                const customerCardNo = getPaymentDetails.card_no;

                //Inserting new customer data
                const insertNewCustQuery =
                    'INSERT INTO hotelbooking.customer (c_no, c_name, c_email, c_address, c_cardtype, c_cardexp, c_cardno) VALUES ($1, $2, $3, $4, $5, $6, $7);';
                await client.query(insertNewCustQuery, [newCustomerNumber, customerName, customerEmail, customerAddr, customerCardType, cardExpMonthYear, customerCardNo], (err, results) => {
                    if (err) {
                        console.log(err.stack)
                        errors = err.stack.split(" at ");
                        res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                    } else {
                        client.release();
                        // After creating new customer, create new booking with reference
                        createNewCustomerBooking(newCustomerNumber);

                    }
                });
            }
        });

        // Create new booking for newly created customer - function
        async function createNewCustomerBooking(customerNo) {
            const latestBookRefNoQuery = 'SELECT MAX(b_ref) FROM hotelbooking.booking;';
            await client.query(latestBookRefNoQuery, async (err, results) => {
                if (err) {
                    console.log(err.stack)
                    errors = err.stack.split(" at ");
                    res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                } else {
                    const bookingCost = bookingDetails.total_cost;
                    const outstandingCost = '0';
                    const bookingNotes = 'Lorem Ipsum';

                    client.release();
                    const latestBookRefNumber = results.rows[0].max || 0; // Fetch the latest booking reference number
                    newBookRefNumber = latestBookRefNumber + 1; // Create latest or new booking reference number

                    // Create entry inside booking table with the newly generated booking reference number
                    const insertNewBookingRefQuery =
                        'INSERT INTO hotelbooking.booking (b_ref, c_no, b_cost, b_outstanding, b_notes) VALUES ($1, $2, $3, $4, $5);';
                    await client.query(insertNewBookingRefQuery, [newBookRefNumber, newCustomerNumber, outstandingCost, bookingNotes], async (err, results) => {
                        if (err) {
                            console.log(err.stack)
                            errors = err.stack.split(" at ");
                            res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                        } else {
                            client.release();
                            // After creating new booking reference, create entry into roombooking table as well
                            const getRoomsList = bookingDetails.room_data;
                            const checkin = bookingDetails.arrival_date;
                            const checkout = bookingDetails.checkout_date;
                            for (var i = 1; i <= getRoomsList.length; i++) {
                                const insertNewRoomBookQuery = 'INSERT INTO hotelbooking.roombooking (r_no, b_ref, checkin, checkout) VALUES ($1, $2, $3, $4);';
                                await client.query(insertNewRoomBookQuery, [getRoomsList[i], newBookRefNumber, checkin, checkout], async (err, results) => {
                                    if (err) {
                                        console.log(err.stack)
                                        errors = err.stack.split(" at ");
                                        res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                                    } else {
                                        client.release();
                                        // Lastly, update the room/s status as the booking is successful 
                                        const updateRoomStatus = 'UPDATE hotelbooking.room SET r_status = O WHERE r_no = $1;';
                                        await client.query(updateRoomStatus, [getRoomsList[i]], async (err, results) => {
                                            if (err) {
                                                console.log(err.stack)
                                                errors = err.stack.split(" at ");
                                                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                                            } else {
                                                client.release();
                                                res.status(200).json({ message: 'Room booked successfully by customer' });
                                            }
                                        });
                                    }

                                });
                            }
                        }
                    });
                }

            });
        }
    }
    catch (e) {
        console.log(e);
    }
});

// Insert a new customer record with the booking in the DB - Receptionist
app.post('/api/receptionist/newbooking', async (req, res) => {
    try {

        const bookingDetails = JSON.parse(localStorage.getItem("roomDetails"));
        const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
        const getPaymentDetails = JSON.parse(localStorage.getItem("setPaymentDetails"));

        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const latestCustNoQuery = 'SELECT MAX(c_no) FROM hotelbooking.customer;';
        await client.query(latestCustNoQuery, async (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();

                const latestCustNumber = results.rows[0].max || 0; // Fetch the latest customer number
                newCustomerNumber = latestCustNumber + 1; // Create latest or new customer number

                const customerName = getPaymentDetails.full_name;
                const customerEmail = getPaymentDetails.email;
                const customerAddr = getPaymentDetails.address + "," + getPaymentDetails.city + "," + getPaymentDetails.state + "," + getPaymentDetails.zip;
                const customerCardType = 'V';
                const customerCardExpMonth = getPaymentDetails.card_expiry_month;
                const customerCardExpYear = getPaymentDetails.card_expiry_year;
                const cardExpMonthYear = customerCardExpMonth + "/" + customerCardExpYear;
                const customerCardNo = getPaymentDetails.card_no;

                //Inserting new customer data
                const insertNewCustQuery =
                    'INSERT INTO hotelbooking.customer (c_no, c_name, c_email, c_address, c_cardtype, c_cardexp, c_cardno) VALUES ($1, $2, $3, $4, $5, $6, $7);';
                await client.query(insertNewCustQuery, [newCustomerNumber, customerName, customerEmail, customerAddr, customerCardType, cardExpMonthYear, customerCardNo], (err, results) => {
                    if (err) {
                        console.log(err.stack)
                        errors = err.stack.split(" at ");
                        res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                    } else {
                        client.release();
                        // After creating new customer, create new booking with reference
                        createNewCustomerBooking(newCustomerNumber);

                    }
                });
            }
        });

        // Create new booking for newly created customer - function
        async function createNewCustomerBooking(customerNo) {
            const latestBookRefNoQuery = 'SELECT MAX(b_ref) FROM hotelbooking.booking;';
            await client.query(latestBookRefNoQuery, async (err, results) => {
                if (err) {
                    console.log(err.stack)
                    errors = err.stack.split(" at ");
                    res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                } else {
                    const bookingCost = bookingDetails.total_cost;
                    const outstandingCost = '0';
                    const bookingNotes = 'Lorem Ipsum';

                    client.release();
                    const latestBookRefNumber = results.rows[0].max || 0; // Fetch the latest booking reference number
                    newBookRefNumber = latestBookRefNumber + 1; // Create latest or new booking reference number

                    // Create entry inside booking table with the newly generated booking reference number
                    const insertNewBookingRefQuery =
                        'INSERT INTO hotelbooking.booking (b_ref, c_no, b_cost, b_outstanding, b_notes) VALUES ($1, $2, $3, $4, $5);';
                    await client.query(insertNewBookingRefQuery, [newBookRefNumber, newCustomerNumber, outstandingCost, bookingNotes], async (err, results) => {
                        if (err) {
                            console.log(err.stack)
                            errors = err.stack.split(" at ");
                            res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                        } else {
                            client.release();
                            // After creating new booking reference, create entry into roombooking table as well
                            const getRoomsList = bookingDetails.room_data;
                            const checkin = bookingDetails.arrival_date;
                            const checkout = bookingDetails.checkout_date;
                            for (var i = 1; i <= getRoomsList.length; i++) {
                                const insertNewRoomBookQuery = 'INSERT INTO hotelbooking.roombooking (r_no, b_ref, checkin, checkout) VALUES ($1, $2, $3, $4);';
                                await client.query(insertNewRoomBookQuery, [getRoomsList[i], newBookRefNumber, checkin, checkout], async (err, results) => {
                                    if (err) {
                                        console.log(err.stack)
                                        errors = err.stack.split(" at ");
                                        res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                                    } else {
                                        client.release();
                                        // Lastly, update the room/s status as the booking is successful 
                                        const updateRoomStatus = 'UPDATE hotelbooking.room SET r_status = O WHERE r_no = $1;';
                                        await client.query(updateRoomStatus, [getRoomsList[i]], async (err, results) => {
                                            if (err) {
                                                console.log(err.stack)
                                                errors = err.stack.split(" at ");
                                                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                                            } else {
                                                client.release();
                                                res.status(200).json({ message: 'Room booked successfully via receptionist' });
                                            }
                                        });
                                    }

                                });
                            }
                        }
                    });
                }

            });
        }
    }
    catch (e) {
        console.log(e);
    }
});

// Housekeeper to update room back to available once cleaned
app.put('/api/housekeeper/:roomNumber', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const { roomNo } = req.query;
        const updateRoomStatusToCleanQuery = `UPDATE hotelbooking.room SET r_status = C WHERE r_no = $1`;;
        await client.query(updateRoomStatusToCleanQuery, [roomNo], async (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();
                // After changing room status to clean, update the status to Available
                const updateRoomStatusToAvailableQuery = `UPDATE hotelbooking.room SET r_status = A WHERE r_no = $1`;
                await client.query(updateRoomStatusToAvailableQuery, [roomNo], (err, results) => {
                    if (err) {
                        console.log(err.stack)
                        errors = err.stack.split(" at ");
                        res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                    } else {
                        client.release();
                        res.status(200).json({ message: `Room ${roomNumber} is Available again to book.` });
                    }
                });
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