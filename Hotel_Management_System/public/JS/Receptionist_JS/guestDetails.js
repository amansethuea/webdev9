// Getting room selection details as a local storage on Guest Details page
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

// Client-side JS validations for the Guest Details form inputs 
var refButton = document.getElementById("details_submit_btn");
refButton.addEventListener("click", function (event) {
    const guest = document.getElementById('guest').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    
    // If guest field is empty of given 0
    if (guest == "" || guest == 0) {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    // Checks if first name is not entered
    if (firstname == "") {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }
    // Checks if numeric values are entered in the first name field
    if (/^[a-zA-Z ]*$/.test(firstname) == true) {
        document.getElementById("span5").style.display = "none";
    }
    else {
        document.getElementById("span5").style.display = "inline";
    }
    // Checks if last name is not entered
    if (lastname == "") {
        document.getElementById("span6").style.display = "inline";
    }
    else {
        document.getElementById("span6").style.display = "none";
    }
    // Checks if numeric values are entered in the last name field
    if (/^[a-zA-Z ]*$/.test(lastname) == true) {
        document.getElementById("span7").style.display = "none";
    }
    else {
        document.getElementById("span7").style.display = "inline";
    }
    // Checks if the mobile no field has any alphabets 
    // Checks if the mobile number exceeds 11 numbers
    if (/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobile) == true) {
        document.getElementById("span8").style.display = "none";
    }
    else {
        document.getElementById("span8").style.display = "inline";
    }

    // email check validation including blank field check
    if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) == true) {
        document.getElementById("span9").style.display = "none";
        // Checks if the local storage contains existing values, then resets it to avoid conflicts with old data
        if (localStorage.getItem('customerDetails') != null) {
            console.log("Previous data found in local storage customerDetails. Clearing it first before proceeding.")
            localStorage.removeItem('customerDetails');
            // Creates local storage with guest data
            localStorage.setItem('customerDetails', JSON.stringify(createGuestDetailsData(guest.trim(), firstname.trim(), lastname.trim(), mobile.trim(), email.trim())));
            const customerDetails = localStorage.getItem("customerDetails");
            console.log("Created new local storage data for customerDetails");
            console.log(customerDetails);
            window.location.href = "http://localhost:3000/receptionist/payment_process.html";
        }
        else {
            // Creates fresh local storage with guest data if no old local storage data is found
            localStorage.setItem('customerDetails', JSON.stringify(createGuestDetailsData(guest.trim(), firstname.trim(), lastname.trim(), mobile.trim(), email.trim())));
            console.log("No previous data in local storage found for customerDetails. Creating fresh..");
            const customerDetails = localStorage.getItem("customerDetails");
            console.log(customerDetails);
            window.location.href = "http://localhost:3000/receptionist/payment_process.html";
        }
    }
    else {
        document.getElementById("span9").style.display = "inline";
    }
    // Prevents auto submit of the form on submit button click
    // If this is not given, client-side validations won't work
    event.preventDefault();

});
