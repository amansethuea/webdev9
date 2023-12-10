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
    if (data['results'].length === 0) {
        document.getElementById("span7").style.display = "inline";
    }
    else {
        document.getElementById("span7").style.display = "none";
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
            console.log("Previous data found in local storage checkoutDetails. Clearing it first before proceeding.")
            localStorage.removeItem('checkoutDetails');
            localStorage.setItem('checkoutDetails', JSON.stringify(createCheckoutData(customerName, checkin, checkout, roomNo, totalCost, outstandingCost)));
            const checkoutDetails = localStorage.getItem("checkoutDetails");
            console.log("Created new local storage data for checkoutDetails");
            console.log(checkoutDetails);
            window.location.href = "http://localhost:3000/receptionist/extras_menu.html"
        }
        else {
            const customerName = data['results'][0]['c_name'];
            const checkin = data['results'][0]['checkin'];
            const checkout = data['results'][0]['checkout'];
            const roomNo = data['results'][0]['r_no'];
            const totalCost = data['results'][0]['b_cost'];
            const outstandingCost = data['results'][0]['b_outstanding'];
            console.log("Previous data found in local storage checkoutDetails. Clearing it first before proceeding.")
            localStorage.removeItem('checkoutDetails');
            localStorage.setItem('checkoutDetails', JSON.stringify(createCheckoutData(customerName, checkin, checkout, roomNo, totalCost, outstandingCost)));
            const checkoutDetails = localStorage.getItem("checkoutDetails");
            console.log("Created new local storage data for checkoutDetails");
            console.log(checkoutDetails);
            window.location.href = "http://localhost:3000/receptionist/extras_menu.html"
        }
    }
}
function onResponseForCheckoutDetails(response) {
    return response.text();
}

var refButton = document.getElementById("checkoutbtn");
refButton.addEventListener("click", async function (event) {
    var usercheckoutdate = new Date(document.getElementById("checkoutdate").value).toJSON();
    var today = new Date().toJSON().slice(0, 10);
    const ref_no = document.getElementById('referenceno').value;
    const checkout = document.getElementById('checkoutdate').value;
    const roomStatus = 'O';

    if (ref_no == "") {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }
    if (ref_no >= 1 && ref_no.length < 5) {
        document.getElementById("span2").style.display = "inline";
        document.getElementById("span3").style.display = "none";
    }
    else if (ref_no.length > 5) {
        document.getElementById("span3").style.display = "inline";
        document.getElementById("span2").style.display = "none";
    }
    else {
        document.getElementById("span2").style.display = "none";
        document.getElementById("span3").style.display = "none";
    }
    if (usercheckoutdate < today) {
        document.getElementById("span5").style.display = "inline";
        document.getElementById("span6").style.display = "none";
    }
    else if (!usercheckoutdate) {
        document.getElementById("span6").style.display = "inline";
        document.getElementById("span5").style.display = "none";
    }
    else {
        document.getElementById("span5").style.display = "none";
        document.getElementById("span6").style.display = "none";
        fetch(`http://localhost:3000/receptionist/checkoutdetails?b_ref=${ref_no}&checkout_date=${checkout}&room_status=${roomStatus}`)
            .then(onResponseForCheckoutDetails)
            .then(onTextReadyForCheckoutDetails);
    }

    event.preventDefault();
});