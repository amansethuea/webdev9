
const getCheckinDetails = JSON.parse(localStorage.getItem("checkinDetails"));
console.log(getCheckinDetails);

window.onload = function () {
    updateDetailsOnFinalCheckin();
}

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
refButton.addEventListener("click", function (event) {
    document.body.innerHTML = `<h2>${getCheckinDetails.customerName} is checked-in successfully. Re-directing to Home page in 5 seconds..</h2>`
    window.setTimeout(function () {
        window.location.href = "../Receptionist/index.html";
    }, 5000);


    event.preventDefault();
});

