function onTextReadyForCustomerAvailability(text) {
    console.log('Server:', text);
    const data = JSON.parse(text);

    // Hide all rooms, remove 'selected_room' class, and reset background color
    const allRooms = document.querySelectorAll('.room');
    allRooms.forEach(room => {
        room.style.display = "none";
        room.classList.remove('selected_room');
        room.style.backgroundColor = ''; // Reset to default color
    });

    let output = '<ul> ';
    data.results.forEach(element => {
        output += `<li>  Available Room ID: ${element.r_no}  </li>`;
        const roomDiv = document.getElementById(element.r_no);
        if (roomDiv) {
            // Show the available room
            roomDiv.style.display = "block";
            // If the room was previously selected, reselect it
            if (roomDiv.classList.contains('selected_room')) {
                roomDiv.classList.add('selected_room');
                roomDiv.style.backgroundColor = 'rgba(0, 84, 29, 0.38)'; // Change to the color you want when selected
            }
        } else {
            console.error('No div found for room ID:', element.r_no);
        }
    })
    output += '</ul>'

    // Update the room count
    updateRoomCount();
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



// Code for the booking page
// Booking summary

// Get all room elements
const rooms = document.querySelectorAll('.room');

// Function to update the room count
function updateRoomCount() {
    // Count the number of selected rooms
    const selectedRooms = document.querySelectorAll('.room.selected_room').length;

    // Update the room count display
    document.getElementById('roomsCount').textContent = selectedRooms;
}

// Add click event listeners to all room elements
rooms.forEach(room => {
    room.addEventListener('click', function() {
        // Toggle the 'selected_room' class
        this.classList.toggle('selected_room');

        // Change the background color of the room div when it's selected
        if (this.classList.contains('selected_room')) {
            this.style.backgroundColor = 'rgba(0, 84, 29, 0.38)'; // Change to the color you want when selected
        } else {
            this.style.backgroundColor = ''; // Reset to default color when not selected
        }

        // Update the room count
        updateRoomCount();
    });
});

// Initial update of room count
updateRoomCount();



// Get the date input elements
const checkinDateInput = document.getElementById('booking-in-date');
const checkoutDateInput = document.getElementById('booking-out-date');

// Get the div elements to display the dates and duration
const arrivalDateDiv = document.querySelector('#checkinDate');
const checkoutDateDiv = document.querySelector('#checkoutDate');
const durationDiv = document.querySelectorAll('.booking-box-summary')[3].querySelector('div:nth-child(2)');

// Function to update the dates and duration
function updateDatesAndDuration() {
    // Get the selected dates
    const checkinDate = new Date(checkinDateInput.value);
    const checkoutDate = new Date(checkoutDateInput.value);

    // Update the arrival and checkout dates
    arrivalDateDiv.textContent = checkinDate.toDateString();
    checkoutDateDiv.textContent = checkoutDate.toDateString();

    // Calculate and update the duration of stay
    const duration = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    durationDiv.textContent = duration;
}

// Add change event listeners to the date input elements
checkinDateInput.addEventListener('change', updateDatesAndDuration);
checkoutDateInput.addEventListener('change', updateDatesAndDuration);

// Initial update of dates and duration
updateDatesAndDuration();