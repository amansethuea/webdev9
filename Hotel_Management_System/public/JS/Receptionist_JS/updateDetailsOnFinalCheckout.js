// Fetch local storage data to get the checkout details of the guest
const getCheckoutDetails = JSON.parse(localStorage.getItem("checkoutDetails"));
console.log(getCheckoutDetails);

// Fetch local storage data to get the cost of the food and drinks of the guest
const extraItemDetails = JSON.parse(localStorage.getItem("extraItemDetails"));
console.log(extraItemDetails);

// Once the webpage is loaded, show the checkout related guest data on the page
window.onload = function () {
    updateDetailsOnFinalCheckout();
}

// Displaying data on webpage which is fetched from the local storages above
function updateDetailsOnFinalCheckout() {
    const checkin = getCheckoutDetails.checkin;
    const newCheckin = checkin.split("T")[0];
    const checkout = getCheckoutDetails.checkout;
    const newCheckout = checkout.split("T")[0];
    const roomsList = getCheckoutDetails.roomNo;
    // Display all rooms if there were multiple room selection involved in a single guest booking
    if (roomsList.length > 1) {
        var listElement = document.getElementById("roomList");
        for (let i = 0; i < roomsList.length; i++) {
            var span = document.createElement('span');
            span.textContent = roomsList[i];
            listElement.append(span);
        }
    }
    else {
        // Display single room if there was only a single room involved in a single guest booking
        var listElement = document.getElementById("roomList");
        var span = document.createElement('span');
        span.textContent = roomsList;
        listElement.append(span);
    }
    const amount = getCheckoutDetails.totalCost;
    const extrasAmount = extraItemDetails.total_fnb_bill;
    // Adding total amount of the room booking and the extras (food and drinks) to display one total amount in checkout summary
    const totalAmount = parseFloat(amount) + extrasAmount;
    const outstanding_amt = getCheckoutDetails.outstandingCost;
    const customerName = getCheckoutDetails.customerName;

    document.getElementById("checkin").innerText = newCheckin;
    document.getElementById("checkout").innerText = newCheckout;
    document.getElementById("amount").innerText = totalAmount;
    document.getElementById("outstanding_amt").innerText = outstanding_amt;
    document.getElementById("personName").innerText = customerName;
}

var refButton = document.getElementById("complete_checkout_btn");
refButton.addEventListener("click", function (event) {
    function createData(room_no) {
        const data = {
            room_no: room_no
        };
        return JSON.stringify(data);
    }

    function createOptions(data) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        }

        return fetchOptions;
    }
    // Invoking POST call to update DB tables accordingly on guest checkout
    // Invoking POST call in a loop as per the number of rooms as DB tables need to be updated accordingly and individually for every room
    const roomList = getCheckoutDetails.roomNo;
    if (roomList.length > 1) {
        for (let i = 0; i < roomList.length; i++) {
            const data = createData(String(roomList[i]));
            const fetchOptions = createOptions(data);
            fetch('http://localhost:3000/api/receptionist/roomStatusUpdateOnCheckout', fetchOptions)
        }
        reDirectToHome();
        clearLocalStorages();
    }
    else {
        // Invoking POST call to update DB tables accordingly on guest checkout
        const data = createData(String(getCheckoutDetails.roomNo));
        const fetchOptions = createOptions(data);
        fetch('http://localhost:3000/api/receptionist/roomStatusUpdateOnCheckout', fetchOptions)
        .then(reDirectToHome)
        .then(clearLocalStorages);
    }

    // On clicking checkout button, displaying success message on the screen and re-directing to the index.html / home screen after 5 seconds
    function reDirectToHome() {
        document.body.innerHTML = `<h2>${getCheckoutDetails.customerName} is checked-out successfully. Re-directing to Home page in 5 seconds..</h2>`
        window.setTimeout(function () {
            window.location.href = "../Receptionist/index.html";
        }, 5000);
    }

    // Clear all local storages once check-out is successfull for the local storages to be fresh and clean for new bookings
    function clearLocalStorages() {
        if (localStorage.getItem("roomDetails") != null) {
            localStorage.removeItem('roomDetails');
            console.log("Cleared Local Storage roomDetails");
        }
        else {
            console.log("Local Storage roomDetails is already empty. Proceeding..");
        }
        if (localStorage.getItem("customerDetails") != null) {
            localStorage.removeItem('customerDetails');
            console.log("Cleared Local Storage customerDetails");
        }
        else {
            console.log("Local Storage customerDetails is already empty. Proceeding..");
        }
        if (localStorage.getItem("setPaymentDetails") != null) {
            localStorage.removeItem('setPaymentDetails');
            console.log("Cleared Local Storafe setPaymentDetails");
        }
        else {
            console.log("Local Storage setPaymentDetails is already empty. Proceeding..");
        }
        if (localStorage.getItem("checkinDetails") != null) {
            localStorage.removeItem('checkinDetails');
            console.log("Cleared Local Storage checkinDetails");
        }
        else {
            console.log("Local Storage checkinDetails is already empty. Proceeding..");
        }
        if (localStorage.getItem("checkoutDetails") != null) {
            localStorage.removeItem('checkoutDetails');
            console.log("Cleared Local Storage checkoutDetails")
        }
        else {
            console.log("Local Storage checkoutDetails is already empty. Proceeding..");
        }
        if (localStorage.getItem("extraItemDetails") != null) {
            localStorage.removeItem("extraItemDetails");
            console.log("Cleared Local Storage extraItemDetails");
        }
        else {
            console.log("Local Storage extraItemDetails is already empty. Proceeding..");
        }
    }

    event.preventDefault();
});
