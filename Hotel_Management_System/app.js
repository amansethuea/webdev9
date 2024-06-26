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

const crypto = require('crypto');

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

        const {room_status, b_ref, checkin_date, checkout_date} = req.query;

        // // Validate the inputs using the validateInput function to stop SQL injection
        // if (!validateInput(room_status) || !validateInput(b_ref) || !validateInput(checkin_date) || !validateInput(checkout_date)) {
        //     res.status(400).json({ message: 'Invalid input' });
        //     return;
        // }

        const q = 'select distinct(hotelbooking.customer.c_name), hotelbooking.booking.b_ref, hotelbooking.roombooking.checkin, hotelbooking.roombooking.checkout, hotelbooking.booking.b_cost, hotelbooking.booking.b_outstanding from hotelbooking.customer, hotelbooking.booking, hotelbooking.roombooking, hotelbooking.room where hotelbooking.customer.c_no = hotelbooking.booking.c_no and hotelbooking.room.r_no = hotelbooking.roombooking.r_no and hotelbooking.room.r_status = $1 and hotelbooking.booking.b_ref = $2 and (hotelbooking.roombooking.checkin = $3 and hotelbooking.roombooking.checkout = $4);';
        await client.query(q, [room_status, b_ref, checkin_date, checkout_date], (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();
                data = results.rows;
                count = results.rows.length;
                res.json({ results: data});
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

        const{checkin_date, checkout_date, room_type} = req.query;

        // // Validate the inputs using the validateInput function to stop SQL injection
        // if (!validateInput(checkin_date) || !validateInput(checkout_date) || !validateInput(room_type)) {
        //     res.status(400).json({ message: 'Invalid input' });
        //     return;
        // }
        const q =
            'select r_no FROM (select distinct(hotelbooking.room.r_no), hotelbooking.room.r_class from hotelbooking.room, hotelbooking.roombooking where hotelbooking.room.r_status = \'A\' and hotelbooking.roombooking.r_no not in( select hotelbooking.roombooking.r_no from hotelbooking.roombooking where(checkin <= $1 and checkout>= $2) and hotelbooking.room.r_no = hotelbooking.roombooking.r_no)) AS room_details WHERE r_class = $3;'
            console.log(q);
        await client.query(q, [checkin_date, checkout_date, room_type], (err, results) => {
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

/* GET available rooms within selected dates - Customer*/
app.get('/customer/roomavailability', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const{checkin_date, checkout_date, room_type} = req.query;

        // // Validate the inputs using the validateInput function to stop SQL injection
        // if (!validateInput(checkin_date) || !validateInput(checkout_date) || !validateInput(room_type)) {
        //     res.status(400).json({ message: 'Invalid input' });
        //     return;
        // }

        const q =
            'select r_no FROM (select distinct(hotelbooking.room.r_no), hotelbooking.room.r_class from hotelbooking.room, hotelbooking.roombooking where hotelbooking.room.r_status = \'A\' and hotelbooking.roombooking.r_no not in( select hotelbooking.roombooking.r_no from hotelbooking.roombooking where(checkin <=$1 and checkout>= $2) and hotelbooking.room.r_no = hotelbooking.roombooking.r_no)) AS room_details WHERE r_class = $3;'
        
        await client.query(q, [checkin_date, checkout_date, room_type], (err, results) => {
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

/* GET booking data on checkout - Receptionist*/
app.get('/receptionist/checkoutdetails', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const{b_ref, checkout_date, room_status} = req.query;

        // // Validate the inputs using the validateInput function to stop SQL injection
        // if (!validateInput(b_ref) || !validateInput(checkout_date) || !validateInput(room_status)) {
        //     res.status(400).json({ message: 'Invalid input' });
        //     return;
        // }

        const q = 'select distinct(hotelbooking.customer.c_name), hotelbooking.roombooking.checkin, hotelbooking.roombooking.checkout, hotelbooking.booking.b_cost, hotelbooking.booking.b_outstanding, hotelbooking.room.r_no from hotelbooking.customer, hotelbooking.booking, hotelbooking.roombooking, hotelbooking.room  where hotelbooking.customer.c_no = hotelbooking.booking.c_no  and hotelbooking.room.r_no = hotelbooking.roombooking.r_no and hotelbooking.booking.b_ref = $1 and hotelbooking.roombooking.checkout = $2 and hotelbooking.room.r_status = $3 group by hotelbooking.room.r_no, hotelbooking.customer.c_name, hotelbooking.roombooking.checkin, hotelbooking.roombooking.checkout, hotelbooking.booking.b_cost, hotelbooking.booking.b_outstanding;';

        await client.query(q, [b_ref, checkout_date, room_status], (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();
                data = results.rows;
                count = results.rows.length;
                res.json({ results: data, rows: count});
            }
        });

    } catch (e) {
        console.log(e);
    }
});

/* GET booking reference - Customer*/
app.get('/customer/getref', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();


        const q = 'SELECT MAX(b_ref) FROM hotelbooking.booking;';
        await client.query(q, (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();
                data = results.rows;
                res.json({ results: data });
            }
        });

    } catch (e) {
        console.log(e);
    }
});

/* GET booking reference - Receptionist*/
app.get('/receptionist/getref', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const q = 'SELECT MAX(b_ref) FROM hotelbooking.booking;';
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

/* GET NA rooms from DB - Housekeeper*/
app.get('/housekeeper/notAvailableRoomInfo', async (req, res) => {
    try {
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        const q = "SELECT r_no from hotelbooking.room WHERE r_status = \'X\';";
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
        const body = req.body;
        console.log(body);
        var getRoomsList = [];
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        // // Validate the inputs using the validateInput function to stop SQL injection
        // if (!validateInput(body.full_name) || !validateInput(body.email) || !validateInput(body.address) || !validateInput(body.city) || !validateInput(body.state) || !validateInput(body.zip) || !validateInput(body.card_no) || !validateInput(body.card_expiry_month) || !validateInput(body.card_expiry_year)) {
        //     res.status(400).json({ message: 'Invalid input' });
        //     return;
        // }

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
                console.log(`The new customer no. formed is: ${newCustomerNumber}`);
                const customerName = body.full_name;
                const customerEmail = body.email;
                const customerAddr = body.address + "," + body.city + "," + body.state + "," + body.zip;
                const customerCardType = 'V';
                const customerCardExpMonth = body.card_expiry_month;
                const customerCardExpYear = body.card_expiry_year;
                const cardExpMonthYear = customerCardExpMonth + "/" + customerCardExpYear;
                const customerCardNo = body.card_no;

                // Create a hash of the card number
                const hash = crypto.createHash('sha256');
                hash.update(customerCardNo);
                let hashedCardNo = hash.digest('hex');

                // Truncate or pad the hashedCardNo to 16 characters
                if (hashedCardNo.length > 16) {
                    hashedCardNo = hashedCardNo.substring(0, 16);
                } else if (hashedCardNo.length < 16) {
                    hashedCardNo = hashedCardNo.padEnd(16, '0');
                }

                //Inserting new customer data
                const insertNewCustQuery =
                    'INSERT INTO hotelbooking.customer (c_no, c_name, c_email, c_address, c_cardtype, c_cardexp, c_cardno) VALUES ($1, $2, $3, $4, $5, $6, $7);';
                await client.query(insertNewCustQuery, [newCustomerNumber, customerName, customerEmail, customerAddr, customerCardType, cardExpMonthYear, hashedCardNo], (err, results) => {
                    if (err) {
                        console.log(err.stack)
                        errors = err.stack.split(" at ");
                        res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                    } else {
                        //client.release();
                        console.log("New customer is created in DB successfully.")
                        console.log(customerCardNo);
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
                    const bookingCost = body.total_cost;
                    const newBookingCost = bookingCost.replace(/\u00A3/g, '');
                    console.log(`Booking Cost is coming out to be: ${newBookingCost}`)
                    const outstandingCost = '0';
                    const bookingNotes = 'Lorem Ipsum';

                    const latestBookRefNumber = results.rows[0].max || 0; // Fetch the latest booking reference number
                    newBookRefNumber = latestBookRefNumber + 1; // Create latest or new booking reference number
                    // Create entry inside booking table with the newly generated booking reference number
                    const insertNewBookingRefQuery =
                        'INSERT INTO hotelbooking.booking (b_ref, c_no, b_cost, b_outstanding, b_notes) VALUES ($1, $2, $3, $4, $5);';
                    await client.query(insertNewBookingRefQuery, [newBookRefNumber, newCustomerNumber, newBookingCost, outstandingCost, bookingNotes], async (err, results) => {
                        if (err) {
                            console.log(err.stack)
                            errors = err.stack.split(" at ");
                            res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                        } else {
                            console.log(`Booking Reference has been created successfully: ${newBookRefNumber}`);
                            // After creating new booking reference, create entry into roombooking table as well
                            getRoomsList = body.room_data;
                            const checkin = body.checkin;
                            const checkout = body.checkout;
                            for (let i = 0; i < getRoomsList.length; i++) {
                                const insertNewRoomBookQuery = 'INSERT INTO hotelbooking.roombooking (r_no, b_ref, checkin, checkout) VALUES ($1, $2, $3, $4);';
                                await client.query(insertNewRoomBookQuery, [getRoomsList[i], newBookRefNumber, checkin, checkout], async (err, results) => {
                                    await new Promise(resolve => setTimeout(resolve, 1000));
                                    if (err) {
                                        console.log(err.stack)
                                        errors = err.stack.split(" at ");
                                        res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                                    } else {
                                        getRoomsList = body.room_data;
                                        console.log(`New entry has been generated in roombooking table for room: ${getRoomsList[i]}`);
                                        // Lastly, update the room/s status as the booking is successful 
                                        const updateRoomStatus = `UPDATE hotelbooking.room SET r_status = 'O' WHERE r_no = ${getRoomsList[i]};`;
                                        await client.query(updateRoomStatus, async (err, results) => {
                                            if (err) {
                                                console.log(err.stack)
                                                errors = err.stack.split(" at ");
                                                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                                            } else {
                                                console.log(`Booking Complete!`);
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
        const body = req.body;
        console.log(body);
        var getRoomsList = [];
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        // // Validate the inputs using the validateInput function to stop SQL injection
        // if (!validateInput(body.full_name) || !validateInput(body.email) || !validateInput(body.address) || !validateInput(body.city) || !validateInput(body.state) || !validateInput(body.zip) || !validateInput(body.card_no) || !validateInput(body.card_expiry_month) || !validateInput(body.card_expiry_year)) {
        //     res.status(400).json({ message: 'Invalid input' });
        //     return;
        // }

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
                console.log(`The new customer no. formed is: ${newCustomerNumber}`);
                const customerName = body.full_name;
                const customerEmail = body.email;
                const customerAddr = body.address + "," + body.city + "," + body.state + "," + body.zip;
                const customerCardType = 'V';
                const customerCardExpMonth = body.card_expiry_month;
                const customerCardExpYear = body.card_expiry_year;
                const cardExpMonthYear = customerCardExpMonth + "/" + customerCardExpYear;
                const customerCardNo = body.card_no;

                /// Create a hash of the card number
                const hash = crypto.createHash('sha256');
                hash.update(customerCardNo);
                let hashedCardNo = hash.digest('hex');

                // Truncate or pad the hashedCardNo to 16 characters
                if (hashedCardNo.length > 16) {
                    hashedCardNo = hashedCardNo.substring(0, 16);
                } else if (hashedCardNo.length < 16) {
                    hashedCardNo = hashedCardNo.padEnd(16, '0');
                }

                //Inserting new customer data
                const insertNewCustQuery =
                    'INSERT INTO hotelbooking.customer (c_no, c_name, c_email, c_address, c_cardtype, c_cardexp, c_cardno) VALUES ($1, $2, $3, $4, $5, $6, $7);';
                await client.query(insertNewCustQuery, [newCustomerNumber, customerName, customerEmail, customerAddr, customerCardType, cardExpMonthYear, hashedCardNo], (err, results) => {
                    if (err) {
                        console.log(err.stack)
                        errors = err.stack.split(" at ");
                        res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                    } else {
                        //client.release();
                        console.log("New customer is created in DB successfully.")
                        console.log(customerCardNo);
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
                    const bookingCost = body.total_cost;
                    const newBookingCost = bookingCost.replace(/\u00A3/g, '');
                    console.log(`Booking Cost is coming out to be: ${newBookingCost}`)
                    const outstandingCost = '0';
                    const bookingNotes = 'Lorem Ipsum';

                    const latestBookRefNumber = results.rows[0].max || 0; // Fetch the latest booking reference number
                    newBookRefNumber = latestBookRefNumber + 1; // Create latest or new booking reference number
                    console.log(`New booking reference generated is: ${newBookRefNumber}`);
                    // Create entry inside booking table with the newly generated booking reference number
                    const insertNewBookingRefQuery =
                        'INSERT INTO hotelbooking.booking (b_ref, c_no, b_cost, b_outstanding, b_notes) VALUES ($1, $2, $3, $4, $5);';
                    await client.query(insertNewBookingRefQuery, [newBookRefNumber, newCustomerNumber, newBookingCost, outstandingCost, bookingNotes], async (err, results) => {
                        if (err) {
                            console.log(err.stack)
                            errors = err.stack.split(" at ");
                            res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                        } else {
                            console.log(`Booking Reference has been created successfully: ${newBookRefNumber}`);
                            // After creating new booking reference, create entry into roombooking table as well
                            getRoomsList = body.room_data;
                            const checkin = body.checkin;
                            const checkout = body.checkout;
                            for (let i = 0; i < getRoomsList.length; i++) {
                                const insertNewRoomBookQuery = 'INSERT INTO hotelbooking.roombooking (r_no, b_ref, checkin, checkout) VALUES ($1, $2, $3, $4);';
                                await client.query(insertNewRoomBookQuery, [getRoomsList[i], newBookRefNumber, checkin, checkout], async (err, results) => {
                                    await new Promise(resolve => setTimeout(resolve, 1000));
                                    if (err) {
                                        console.log(err.stack)
                                        errors = err.stack.split(" at ");
                                        res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                                    } else {
                                        getRoomsList = body.room_data;
                                        console.log(`New entry has been generated in roombooking table for room: ${getRoomsList[i]}`);
                                        // Lastly, update the room/s status as the booking is successful 
                                        const updateRoomStatus = `UPDATE hotelbooking.room SET r_status = 'O' WHERE r_no = ${getRoomsList[i]};`;
                                        await client.query(updateRoomStatus, async (err, results) => {
                                            if (err) {
                                                console.log(err.stack)
                                                errors = err.stack.split(" at ");
                                                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
                                            } else {
                                                console.log(`Booking Complete!`);
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

// Update room status to NA on successful customer checkout - Receptionist
app.post('/api/receptionist/roomStatusUpdateOnCheckout', async (req, res) => {
    try {
        const body = req.body;
        let results;
        const pool = new pg.Pool(config);
        const client = await pool.connect();
        console.log("CALLING UPDATE API")
        const room_no = body.room_no;
        const status = 'X';

        // // Validate the inputs using the validateInput function to stop SQL injection
        // if (!validateInput(room_no)) {
        //     res.status(400).json({ message: 'Invalid input' });
        //     return;
        // }

        const updateRoomStatusToNAQuery = `UPDATE hotelbooking.room SET r_status = '${status}' WHERE r_no = ${room_no};`;
        console.log(updateRoomStatusToNAQuery)
        await client.query(updateRoomStatusToNAQuery, async (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();
                res.status(200).json({ message: `Room ${room_no} is checked out successfully.` });
                console.log(`Room ${room_no} is checked out successfully.`);
            }
        });

    } catch (e) {
        console.log(e);
    }
});


// Update room back to available once cleaned - Housekeeper
app.post('/api/housekeeper/updateCleanedRoomToAvail', async (req, res) => {
    try {
        const body = req.body;
        const roomNo = body.room_no;
        const availStatus = 'A';
        const pool = new pg.Pool(config);
        const client = await pool.connect();

        // // Validate the inputs using the validateInput function to stop SQL injection
        // if (!validateInput(roomNo)) {
        //     res.status(400).json({ message: 'Invalid input' });
        //     return;
        // }

        const updateRoomStatusToAvailableQuery = 'UPDATE hotelbooking.room SET r_status = $1 WHERE r_no = $2';
        await client.query(updateRoomStatusToAvailableQuery, [availStatus, roomNo], (err, results) => {
            if (err) {
                console.log(err.stack)
                errors = err.stack.split(" at ");
                res.json({ message: 'Sorry something went wrong! The data has not been processed ' + errors[0] });
            } else {
                client.release();
                res.status(200).json({ message: `Room ${roomNo} is Available again to book.` });
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
    console.log(`The server is live on port ${port}!`)
});

// input validation function to stop SQL injection
const validateInput = (input) => {
    return /^[a-zA-Z0-9]+$/.test(input);
};