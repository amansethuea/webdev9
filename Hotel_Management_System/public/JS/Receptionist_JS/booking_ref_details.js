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
    if (data['results'].length === 0) {
        document.getElementById("span12").style.display = "inline";
    }
    else {
        document.getElementById("span12").style.display = "none";
        if (localStorage.getItem('checkinDetails') != null) {
            console.log("Previous data found in local storage checkinDetails. Clearing it first before proceeding.")
            localStorage.removeItem('checkinDetails');
            const customerName = data['results'][0]['c_name'];
            const referenceNo = data['results'][0]['b_ref'];
            const checkin = data['results'][0]['checkin'];
            const checkout = data['results'][0]['checkout'];
            const totalCost = data['results'][0]['b_cost'];
            const outstandingCost = data['results'][0]['b_outstanding'];
            localStorage.setItem('checkinDetails', JSON.stringify(createReferenceData(customerName, referenceNo, checkin, checkout, totalCost, outstandingCost)));
            const checkinDetails = localStorage.getItem("checkinDetails");
            console.log("Created new local storage data for checkinDetails");
            console.log(checkinDetails);
            window.location.href = "http://localhost:3000/receptionist/final_checkin.html"
        }
        else {
            const customerName = data['results'][0]['c_name'];
            const referenceNo = data['results'][0]['b_ref'];
            const checkin = data['results'][0]['checkin'];
            const checkout = data['results'][0]['checkout'];
            const totalCost = data['results'][0]['b_cost'];
            const outstandingCost = data['results'][0]['b_outstanding'];
            localStorage.setItem('checkinDetails', JSON.stringify(createReferenceData(customerName, referenceNo, checkin, checkout, totalCost, outstandingCost)));
            console.log("No previous data in local storage found for checkinDetails. Creating fresh..");
            const checkinDetails = localStorage.getItem("checkinDetails");
            console.log(checkinDetails);
            window.location.href = "http://localhost:3000/receptionist/final_checkin.html"
        }
    }
}

function onResponseReceptionistCheckinData(response) {
    return response.text();
}

var refButton = document.getElementById("refbtn");
refButton.addEventListener("click", function (event) {
    var referenceno = document.getElementById("referenceno").value;
    var usercheckindate = new Date(document.getElementById("checkindate").value).toJSON();
    var usercheckoutdate = new Date(document.getElementById("checkoutdate").value).toJSON();
    var today = new Date().toJSON().slice(0, 10);

    // Client-side JS validations on Checkin page for Already Have a Booking section
    // Checks if the reference field is empty
    if (referenceno == "") {
        document.getElementById("span5").style.display = "inline";
    }
    else {
        document.getElementById("span5").style.display = "none";
    }
    // Checks if the reference number length is smaller than 5 since the booking ref no. has to be a 5 digit ID
    if (referenceno.length >= 1 && referenceno.length < 5) {
        document.getElementById("span6").style.display = "inline";
        document.getElementById("span8").style.display = "none";
    }
    // Checks if the reference number length is greater than 5 since the booking ref no. has to be a 5 digit ID
    else if (referenceno.length > 5) {
        document.getElementById("span8").style.display = "inline";
        document.getElementById("span6").style.display = "none";
    }
    else {
        document.getElementById("span6").style.display = "none";
        document.getElementById("span8").style.display = "none";
    }
    // Checks if the checkin date is of previous date than today's date
    if (usercheckindate < today) {
        document.getElementById("span2").style.display = "inline";
    }
    else {
        document.getElementById("span2").style.display = "none";
    }
    // Checks if the checkin date is not provided
    if (!usercheckindate) {
        document.getElementById("span9").style.display = "inline";
    }
    else {
        document.getElementById("span9").style.display = "none";
    }
    // Checks if the checkout date is same as today or of previous date
    if (usercheckoutdate <= today) {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }
    // Checks if the checkout date is not provided
    if (!usercheckoutdate) {
        document.getElementById("span10").style.display = "inline";
    }
    // Checks if the checkout date is same as checkin date
    // Checks if the checkout date is of previous date than checkin date
    else if (usercheckoutdate <= usercheckindate) {
        document.getElementById("span11").style.display = "inline";
        document.getElementById("span10").style.display = "none";
    }
    else {
        document.getElementById("span10").style.display = "none";
        document.getElementById("span11").style.display = "none";

        const referenceNo = document.getElementById('referenceno').value;
        console.log(referenceNo);
        const checkin = document.getElementById('checkindate').value;
        const checkout = document.getElementById('checkoutdate').value;
        const roomStatus = 'O';
        // GET call to fetch booking details of a customer as per the reference number and checkin, checkout dates
        fetch(`http://localhost:3000/receptionist/refno?room_status=${roomStatus}&b_ref=${referenceNo}&checkin_date=${checkin}&checkout_date=${checkout}`)
            .then(onResponseReceptionistCheckinData)
            .then(onTextReadyReceptionistCheckinData)
    }

    // Prevent auto submit of the details on button click
    event.preventDefault();
});

