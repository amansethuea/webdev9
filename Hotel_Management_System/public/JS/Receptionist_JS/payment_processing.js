const bookingDetails = JSON.parse(localStorage.getItem("roomDetails"));
console.log(bookingDetails);

const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
console.log(customerDetails);

window.onload = function() {
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
    localStorage.setItem('setPaymentDetails', JSON.stringify(createPaymentData(full_name.trim(), email.trim(), address.trim(),
        city.trim(), state.trim(), zip.trim(), card_no.trim(), card_expiry_month.trim(), card_expiry_year.trim())));

    const getPaymentDetails = JSON.parse(localStorage.getItem("setPaymentDetails"));


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

    fetch('http://localhost:3000/api/receptionist/newbooking', fetchOptions)
        .then(window.location.href="http://localhost:3000/receptionist/payment_summary.html");

    event.preventDefault();
});