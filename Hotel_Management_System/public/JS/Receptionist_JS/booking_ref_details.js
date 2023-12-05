function onTextReadyReceptionistCheckinData(text) {
    collectRefData(text);

}

function createReferenceData(customerName, referenceNo, checkin, checkout, totalCost, outstandingCost) {
    const data = {
        customerName: customerName,
        referenceNo: referenceNo,
        checkin: checkin,
        checkout: checkout,
        totalCost: totalCost,
        outstandingCost: outstandingCost
    };
    return data;
}

function collectRefData(text) {
    const data = JSON.parse(text);
    const customerName = data['results'][0]['c_name'];
    const referenceNo = data['results'][0]['b_ref'];
    const checkin = data['results'][0]['checkin'];
    const checkout = data['results'][0]['checkout'];
    const totalCost = data['results'][0]['b_cost'];
    const outstandingCost = data['results'][0]['b_outstanding'];
    localStorage.setItem('checkinDetails', JSON.stringify(createReferenceData(customerName, referenceNo, checkin, checkout, totalCost, outstandingCost)));
}

function onResponseReceptionistCheckinData(response) {
    return response.text();
}

var refButton = document.getElementById("refbtn");
refButton.addEventListener("click", function (event) {
    const referenceNo = document.getElementById('referenceno').value;
    const checkin = document.getElementById('checkindate').value;
    const checkout = document.getElementById('checkoutdate').value;
    const roomStatus = 'O';
    fetch(`http://localhost:3000/receptionist/refno?room_status=${roomStatus}&b_ref=${referenceNo}&checkin_date=${checkin}&checkout_date=${checkout}`)
        .then(onResponseReceptionistCheckinData)
        .then(onTextReadyReceptionistCheckinData)
        .then(window.location.href="http://localhost:3000/receptionist/final_checkin.html");
    event.preventDefault();
});

