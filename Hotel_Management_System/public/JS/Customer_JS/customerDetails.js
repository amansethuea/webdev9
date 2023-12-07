const bookingDetails = JSON.parse(localStorage.getItem("roomDetails"));
console.log(bookingDetails);

/* wrap up the data */
function createGuestDetailsData(guest, firstname, lastname, mobile, email) {
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

    if (guest == "" || guest == 0) {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    if (firstname == "") {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }
    if (/^[a-zA-Z ]*$/.test(firstname) == true) {
        document.getElementById("span5").style.display = "none";
    }
    else {
        document.getElementById("span5").style.display = "inline";
    }
    if (lastname == "") {
        document.getElementById("span6").style.display = "inline";
    }
    else {
        document.getElementById("span6").style.display = "none";
    }
    if (/^[a-zA-Z ]*$/.test(lastname) == true) {
        document.getElementById("span7").style.display = "none";
    }
    else {
        document.getElementById("span7").style.display = "inline";
    }
    if (/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobile) == true) {
        document.getElementById("span8").style.display = "none";
    }
    else {
        document.getElementById("span8").style.display = "inline";
    }

    // email check validation including blank field check
    if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) == true) {
        document.getElementById("span9").style.display = "none";
        if (localStorage.getItem('customerDetails') != null) {
            console.log("Previous data found in local storage customerDetails. Clearing it first before proceeding.")
            localStorage.removeItem('customerDetails');
            localStorage.setItem('customerDetails', JSON.stringify(createGuestDetailsData(guest.trim(), firstname.trim(), lastname.trim(), mobile.trim(), email.trim())));
            const customerDetails = localStorage.getItem("customerDetails");
            console.log("Created new local storage data for customerDetails");
            console.log(customerDetails);
            window.location.href = "http://localhost:3000/customer/payment_process.html";
        }
        else {
            localStorage.setItem('customerDetails', JSON.stringify(createGuestDetailsData(guest.trim(), firstname.trim(), lastname.trim(), mobile.trim(), email.trim())));
            console.log("No previous data in local storage found for customerDetails. Creating fresh..");
            const customerDetails = localStorage.getItem("customerDetails");
            console.log(customerDetails);
            window.location.href = "http://localhost:3000/customer/payment_process.html";
        }
    }
    else {
        document.getElementById("span9").style.display = "inline";
    }

    event.preventDefault();

});
