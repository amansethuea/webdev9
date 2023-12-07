const bookingDetails = JSON.parse(localStorage.getItem("roomDetails"));
console.log(bookingDetails);

const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
console.log(customerDetails);

window.onload = function () {
    updateCart();
}

function updateCart() {
    const getCost = bookingDetails.total_cost;
    const getNoOfRooms = bookingDetails.no_of_rooms;
    document.getElementById("cart_rooms").innerText = getNoOfRooms;
    document.getElementById("total_rooms").innerText = getNoOfRooms;
    document.getElementById("total_cost").innerText = getCost;
}

/* wrap up the data */
function createPaymentData(full_name, email, address, city, state, zip, card_no, card_expiry_month, card_expiry_year) {
    const data = {
        full_name: full_name,
        email: email,
        address: address,
        city: city,
        state: state,
        zip: zip,
        card_no: card_no,
        card_expiry_month: card_expiry_month,
        card_expiry_year: card_expiry_year
    };
    return data;
}

var refButton = document.getElementById("complete_payment_btn");
refButton.addEventListener("click", function (event) {
    const full_name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('adr').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const card_no = document.getElementById('ccnum').value;
    const card_expiry_month = document.getElementById('expmonth').value;
    const card_expiry_year = document.getElementById('expyear').value;
    const cvv = document.getElementById("cvv").value;
    const cardName = document.getElementById("cname").value;

    if (full_name == "") {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    if (/^[a-zA-Z ]*$/.test(full_name) == true) {
        document.getElementById("span2").style.display = "none";
    }
    else {
        document.getElementById("span2").style.display = "inline";
    }

    if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) == true) {
        document.getElementById("span3").style.display = "none";
    }
    else {
        document.getElementById("span3").style.display = "inline";
    }
    if (address == "") {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }
    if (city == "") {
        document.getElementById("span5").style.display = "inline";
    }
    else {
        document.getElementById("span5").style.display = "none";
    }
    if (state == "") {
        document.getElementById("span6").style.display = "inline";
    }
    else {
        document.getElementById("span6").style.display = "none";
    }
    if (state == "") {
        document.getElementById("span6").style.display = "inline";
    }
    else {
        document.getElementById("span6").style.display = "none";
    }
    if (zip == "") {
        document.getElementById("span7").style.display = "inline";
    }
    else {
        document.getElementById("span7").style.display = "none";
    }
    if (zip.length > 7) {
        document.getElementById("span18").style.display = "inline";
    }
    else {
        document.getElementById("span18").style.display = "none";
    }

    if (cardName == "") {
        document.getElementById("span8").style.display = "inline";
    }
    else {
        document.getElementById("span8").style.display = "none";
    }
    if (/^[a-zA-Z ]*$/.test(cardName) == true) {
        document.getElementById("span9").style.display = "none";
    }
    else {
        document.getElementById("span9").style.display = "inline";
    }
    if (card_no == "") {
        document.getElementById("span10").style.display = "inline";
    }
    else {
        document.getElementById("span10").style.display = "none";
    }
    if (card_no.length > 16) {
        document.getElementById("span11").style.display = "inline";
    }
    else {
        document.getElementById("span11").style.display = "none";
    }

    if (card_expiry_month == "") {
        document.getElementById("span12").style.display = "inline";
    }
    else {
        document.getElementById("span12").style.display = "none";
    }
    if (card_expiry_month == "01" || card_expiry_month == "02" || card_expiry_month == "03" || card_expiry_month == "04" || card_expiry_month == "05" || card_expiry_month == "06" || card_expiry_month == "07" || card_expiry_month == "08"
        || card_expiry_month == "09" || card_expiry_month == "10" || card_expiry_month == "11" || card_expiry_month == "12") {
        document.getElementById("span13").style.display = "none";
    }
    else {
        document.getElementById("span13").style.display = "inline";
    }
    if (card_expiry_year == "") {
        document.getElementById("span14").style.display = "inline";
    }
    else {
        document.getElementById("span14").style.display = "none";
    }
    if (card_expiry_year == "23" || card_expiry_year == "24" || card_expiry_year == "25" || card_expiry_year == "26" || card_expiry_year == "27" || card_expiry_year == "28" || card_expiry_year == "29" || card_expiry_year == "30") {
        document.getElementById("span15").style.display = "none";
    }
    else {
        document.getElementById("span15").style.display = "inline";
    }
    if (cvv == "") {
        document.getElementById("span16").style.display = "inline";
    }
    else if (cvv.length > 3) {
        document.getElementById("span17").style.display = "inline";
        document.getElementById("span16").style.display = "none";
    }
    else if (cvv.length < 3) {
        document.getElementById("span17").style.display = "inline";
        document.getElementById("span16").style.display = "none";
    }
    else {
        document.getElementById("span16").style.display = "none";
        document.getElementById("span17").style.display = "none";

        if (localStorage.getItem('setPaymentDetails') != null) {
            console.log("Previous data found in local storage setPaymentDetails. Clearing it first before proceeding.")
            localStorage.removeItem('setPaymentDetails');
            localStorage.setItem('setPaymentDetails', JSON.stringify(createPaymentData(full_name.trim(), email.trim(), address.trim(),
                city.trim(), state.trim(), zip.trim(), card_no.trim(), card_expiry_month.trim(), card_expiry_year.trim())));

            const getPaymentDetails = JSON.parse(localStorage.getItem("setPaymentDetails"));
            console.log("Created new local storage data for setPaymentDetails");
            console.log(getPaymentDetails);
            /* wrap up the data */
            function createData(full_name, email, address, city, state, zip, card_no, card_expiry_month, card_expiry_year, room_data, checkin, checkout, total_cost) {
                const data = {
                    full_name: full_name,
                    email: email,
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    card_no: card_no,
                    card_expiry_month: card_expiry_month,
                    card_expiry_year: card_expiry_year,
                    room_data: room_data,
                    checkin: checkin,
                    checkout: checkout,
                    total_cost: total_cost
                };
                return JSON.stringify(data);
            }

            /* create send meta data */
            function createOptions(data) {
                const fetchOptions = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: data
                }

                return fetchOptions;
            }

            const data = createData(getPaymentDetails.full_name, getPaymentDetails.email, getPaymentDetails.address, getPaymentDetails.city, getPaymentDetails.state,
                getPaymentDetails.zip, getPaymentDetails.card_no, getPaymentDetails.card_expiry_month, getPaymentDetails.card_expiry_year, bookingDetails.room_data,
                bookingDetails.arrival_date, bookingDetails.checkout_date, bookingDetails.total_cost);
            const fetchOptions = createOptions(data);

            fetch('http://localhost:3000/api/customer/newbooking', fetchOptions)
                .then(window.location.href = "http://localhost:3000/customer/payment_summary.html");

        }
        else {
            console.log("No previous data in local storage found for setPaymentDetails. Creating fresh..");
            const getPaymentDetails = localStorage.getItem("setPaymentDetails");
            console.log(getPaymentDetails);
            localStorage.setItem('setPaymentDetails', JSON.stringify(createPaymentData(full_name.trim(), email.trim(), address.trim(),
                city.trim(), state.trim(), zip.trim(), card_no.trim(), card_expiry_month.trim(), card_expiry_year.trim())));
            /* wrap up the data */
            function createData(full_name, email, address, city, state, zip, card_no, card_expiry_month, card_expiry_year, room_data, checkin, checkout, total_cost) {
                const data = {
                    full_name: full_name,
                    email: email,
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    card_no: card_no,
                    card_expiry_month: card_expiry_month,
                    card_expiry_year: card_expiry_year,
                    room_data: room_data,
                    checkin: checkin,
                    checkout: checkout,
                    total_cost: total_cost
                };
                return JSON.stringify(data);
            }

            /* create send meta data */
            function createOptions(data) {
                const fetchOptions = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: data
                }

                return fetchOptions;
            }

            const data = createData(getPaymentDetails.full_name, getPaymentDetails.email, getPaymentDetails.address, getPaymentDetails.city, getPaymentDetails.state,
                getPaymentDetails.zip, getPaymentDetails.card_no, getPaymentDetails.card_expiry_month, getPaymentDetails.card_expiry_year, bookingDetails.room_data,
                bookingDetails.arrival_date, bookingDetails.checkout_date, bookingDetails.total_cost);
            const fetchOptions = createOptions(data);

            fetch('http://localhost:3000/api/customer/newbooking', fetchOptions)
                .then(window.location.href = "http://localhost:3000/customer/payment_summary.html");

        }
    }

    event.preventDefault();
});