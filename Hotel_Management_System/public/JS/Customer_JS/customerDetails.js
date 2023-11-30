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
    const guest = document.getElementById('guest').innerText;
    const firstname = document.getElementById('firstname').innerText;
    const lastname = document.getElementById('lastname').innerText;
    const mobile = document.getElementById('mobile').innerText;
    const email = document.getElementById('email').innerText;
    localStorage.setItem('customerDetails', JSON.stringify(createCustomerDetailsData(guest.trim(), firstname.trim(), lastname.trim(), mobile.trim(), email.trim())));
    window.location.href="http://localhost:3000/customer/payment_process.html";
    event.preventDefault();
});
