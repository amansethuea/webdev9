// Getting payment related details as a local storage on Payment Summary page
const getPaymentDetails = JSON.parse(localStorage.getItem("setPaymentDetails"));
console.log(getPaymentDetails);

// Getting room selection related details as a local storage on Payment Summary page
const bookingDetails = JSON.parse(localStorage.getItem("roomDetails"));
console.log(bookingDetails);

// Getting Guest details as a local storage on Payment Summary page
const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
console.log(customerDetails);

// Display data on Payment Summary UI fetching from local storages invoked above
function onTextReadyForReceptionistRefNo(text) {
    // Log the server response
    console.log('Server:', text);
    const data = JSON.parse(text);
    getRefNo = data.results[0]['max'];
    document.getElementById("b_ref").innerText = getRefNo;
    document.getElementById("amount").innerText = bookingDetails.total_cost;
    document.getElementById("checkin").innerText = bookingDetails.arrival_date;
    document.getElementById("checkout").innerText = bookingDetails.checkout_date;
    document.getElementById("guest").innerText = customerDetails.guest;
    document.getElementById("receiveremail").innerText = customerDetails.email;
    document.getElementById("personName").innerText = customerDetails.firstname;
}

function onResponseForReceptionistRefNo(response) {
    // Extract the text from the response object and return it
    return response.text();
}

window.onload = function () {
    // Call the GET API to get latest booking reference details once the Payment Summary page is loaded 
    fetch('http://localhost:3000/customer/getref')
        .then(onResponseForReceptionistRefNo)
        .then(onTextReadyForReceptionistRefNo);
}
