// Fetch local storage data to get the checkin details of the guest
const getCheckinDetails = JSON.parse(localStorage.getItem("checkinDetails"));
console.log(getCheckinDetails);

// Once the webpage is loaded, show the checkin related guest data on the page
window.onload = function () {
    updateDetailsOnFinalCheckin();
}

// Displaying data on webpage which is fetched from the local storage above
function updateDetailsOnFinalCheckin() {
    const b_ref = getCheckinDetails.referenceNo;
    const checkin = getCheckinDetails.checkin;
    const newCheckin = checkin.split("T")[0];
    const checkout = getCheckinDetails.checkout;
    const newCheckout = checkout.split("T")[0];
    const amount = getCheckinDetails.totalCost;
    const outstanding_amt = getCheckinDetails.outstandingCost;
    const customerName = getCheckinDetails.customerName;

    document.getElementById("b_ref").innerText = b_ref;
    document.getElementById("checkin").innerText = newCheckin;
    document.getElementById("checkout").innerText = newCheckout;
    document.getElementById("amount").innerText = amount;
    document.getElementById("outstanding_amt").innerText = outstanding_amt;
    document.getElementById("personName").innerText = customerName;
}


var refButton = document.getElementById("complete_checkin_btn");
// On clicking complete checkin button, displaying checkin successful message and re-directing the page to index.html i.e the home screen in 5 seconds
refButton.addEventListener("click", function (event) {
    document.body.innerHTML = `<h2>${getCheckinDetails.customerName} is checked-in successfully. Re-directing to Home page in 5 seconds..</h2>`
    window.setTimeout(function () {
        window.location.href = "../Receptionist/index.html";
    }, 5000);


    event.preventDefault();
});

