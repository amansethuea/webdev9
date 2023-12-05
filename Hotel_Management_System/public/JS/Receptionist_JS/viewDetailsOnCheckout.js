function onTextReadyForCheckoutDetails(text) {
    collectCheckoutData(text);
}

function createCheckoutData(customerName, checkin, checkout, roomNo, totalCost, outstandingCost) {
    const data = {
        customerName: customerName,
        checkin: checkin,
        checkout: checkout,
        roomNo: roomNo,
        totalCost: totalCost,
        outstandingCost: outstandingCost
    };
    return data;
}

function collectCheckoutData(text) {
    const data = JSON.parse(text);
    roomNoList = []
    if (data.rows > 1) {
        data.results.forEach(element => {
            roomNoList.push(element.r_no);
        })
        const customerName = data['results'][0]['c_name'];
        const checkin = data['results'][0]['checkin'];
        const checkout = data['results'][0]['checkout'];
        const roomNo = roomNoList;
        const totalCost = data['results'][0]['b_cost'];
        const outstandingCost = data['results'][0]['b_outstanding'];
        localStorage.setItem('checkoutDetails', JSON.stringify(createCheckoutData(customerName, checkin, checkout, roomNo, totalCost, outstandingCost)));
        getCheckoutDetails = localStorage.getItem('checkoutDetails');
        console.log(getCheckoutDetails);
    }
    else {
        const customerName = data['results'][0]['c_name'];
        const checkin = data['results'][0]['checkin'];
        const checkout = data['results'][0]['checkout'];
        const roomNo = data['results'][0]['r_no'];
        const totalCost = data['results'][0]['b_cost'];
        const outstandingCost = data['results'][0]['b_outstanding'];
        localStorage.setItem('checkoutDetails', JSON.stringify(createCheckoutData(customerName, checkin, checkout, roomNo, totalCost, outstandingCost)));
        getCheckoutDetails = localStorage.getItem('checkoutDetails');
        console.log(getCheckoutDetails);
    }
}

function onResponseForCheckoutDetails(response) {
    return response.text();
}

var refButton = document.getElementById("checkoutbtn");
refButton.addEventListener("click", function (event) {
    const ref_no = document.getElementById('referenceno').value;
    const checkout = document.getElementById('checkoutdate').value;
    const roomStatus = 'O';
    fetch(`http://localhost:3000/receptionist/checkoutdetails?b_ref=${ref_no}&checkout_date=${checkout}&room_status=${roomStatus}`)
        .then(onResponseForCheckoutDetails)
        .then(onTextReadyForCheckoutDetails)
        .then(window.location.href="http://localhost:3000/receptionist/final_checkout.html");
    event.preventDefault();
});