const getCheckoutDetails = JSON.parse(localStorage.getItem("checkoutDetails"));
console.log(getCheckoutDetails);


window.onload = function () {
    updateDetailsOnFinalCheckout();
}

function updateDetailsOnFinalCheckout() {
    const checkin = getCheckoutDetails.checkin;
    const newCheckin = checkin.split("T")[0];
    const checkout = getCheckoutDetails.checkout;
    const newCheckout = checkout.split("T")[0];
    const roomsList = getCheckoutDetails.roomNo;
    if (roomsList.length > 1) {
        var listElement = document.getElementById("roomList");
        for (let i = 0; i < roomsList.length; i++) {
            var span = document.createElement('span');
            span.textContent = roomsList[i];
            listElement.append(span);
        }
    }
    else {
        var listElement = document.getElementById("roomList");
        var span = document.createElement('span');
        span.textContent = roomsList;
        listElement.append(span);
    }
    const amount = getCheckoutDetails.totalCost;
    const outstanding_amt = getCheckoutDetails.outstandingCost;
    const customerName = getCheckoutDetails.customerName;

    document.getElementById("checkin").innerText = newCheckin;
    document.getElementById("checkout").innerText = newCheckout;
    document.getElementById("amount").innerText = amount;
    document.getElementById("outstanding_amt").innerText = outstanding_amt;
    document.getElementById("personName").innerText = customerName;
}

var refButton = document.getElementById("complete_checkout_btn");
refButton.addEventListener("click", function (event) {
    document.body.innerHTML = `<h2>${getCheckoutDetails.customerName} is checked-out successfully. Re-directing to Home page in 5 seconds..</h2>`
    window.setTimeout(function () {
        window.location.href = "../Receptionist/index.html";
    }, 5000);


    event.preventDefault();
});
