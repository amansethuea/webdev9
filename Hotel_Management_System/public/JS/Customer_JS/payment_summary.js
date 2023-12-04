const getPaymentDetails = JSON.parse(localStorage.getItem("setPaymentDetails"));
console.log(getPaymentDetails);

const bookingDetails = JSON.parse(localStorage.getItem("roomDetails"));
console.log(bookingDetails);

const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
console.log(customerDetails);

function onTextReadyForCustomerRefNo(text) {
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

function onResponseForCustomerRefNo(response) {
    // Extract the text from the response object and return it
    return response.text();
}

window.onload = function () {
    fetch('http://localhost:3000/customer/getref')
        .then(onResponseForCustomerRefNo)
        .then(onTextReadyForCustomerRefNo);
}
