const bookingDetails = JSON.parse(localStorage.getItem("roomDetails"));
console.log(bookingDetails);

const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
console.log(customerDetails);

var refButton = document.getElementById("complete_payment_btn");
refButton.addEventListener("click", function (event) {
    window.location.href="http://localhost:3000/customer/payment_summary.html";
    event.preventDefault();
});