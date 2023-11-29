function onTextReadyForCustomerAvailability(text) {
    console.log(text);
    const data = JSON.parse(text);

    let output = '<ul> ';
    data.results.forEach(element => {
        // console.log(element);
        output += `<li>  Available Room ID: ${element.r_no}  </li>`;
    })
    output += '</ul>'

    const results = document.querySelector('#bookingdates');
    results.innerHTML =
        ` <h3> Results </h3>
      <h6> rows count: ${data.rows} </h6>
      <ul> ${output} </ul>
    `;

}

function onResponseForCustomerAvailability(response) {
    return response.text();
}

var refButton = document.getElementById("bookingbtn");
refButton.addEventListener("click", function (event) {
    const checkin = document.getElementById('booking-in-date').value;
    const checkout = document.getElementById('booking-out-date').value;
    const roomType = document.getElementById('room_type_select').value;
    let selectedRoom;

    if (roomType == "standard_double") {
        selectedRoom = "std_d";
    }
    else if (roomType == "standard_twin") {
        selectedRoom = "std_t";
    }
    else if (roomType == "superior_double") {
        selectedRoom = "sup_d";
    }
    else if (roomType == "superior_twin") {
        selectedRoom = "sup_t";
    }
    else {
        console.log("Invalid room selection")
    }

    console.log(checkin)
    console.log(checkout)
    fetch(`http://localhost:3000/customer/roomavailability?checkin_date=${checkin}&checkout_date=${checkout}&room_type=${selectedRoom}`)
        .then(onResponseForCustomerAvailability)
        .then(onTextReadyForCustomerAvailability);
    event.preventDefault();
});

