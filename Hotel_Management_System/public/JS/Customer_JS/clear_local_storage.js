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
}

window.onload = function () {
    clearLocalStorages();
}