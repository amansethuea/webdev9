const bookingDetails = JSON.parse(localStorage.getItem("roomDetails"));
console.log(bookingDetails);

/* wrap up the data */
function createCustomerDetailsData(guest, firstname, lastname, mobile, email) {
    const data = {
        guest: guest,
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        email: email
    };
    return data;
}

var refButton = document.getElementById("details_submit_btn");
refButton.addEventListener("click", function (event) {
    const guest = document.getElementById('guest').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    localStorage.setItem('customerDetails', JSON.stringify(createCustomerDetailsData(guest.trim(), firstname.trim(), lastname.trim(), mobile.trim(), email.trim())));
    window.location.href="http://localhost:3000/customer/payment_process.html";
    event.preventDefault();
});
