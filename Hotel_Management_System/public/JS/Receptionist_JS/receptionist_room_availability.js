function onTextReadyForReceptionistAvailability(text) {
    // Log the server response
    console.log('Server:', text);

    // Parse the server response text into a JSON object
    const data = JSON.parse(text);

    // Get all elements with the class 'room'
    const allRooms = document.querySelectorAll('.room');

    // For each room, hide it, remove the 'selected_room' class, and reset its background color
    allRooms.forEach(room => {
        room.style.display = "none";
        room.classList.remove('selected_room');
        room.style.backgroundColor = ''; // Reset to default color
    });

    // Initialize an output string with an opening unordered list tag
    let output = '<ul> ';

    // For each result in the data object, add a list item to the output string with the room ID
    // and if a div with the room ID exists, display it and if it was previously selected, reselect it
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
            // If no div with the room ID was found, log an error
            console.error('No div found for room ID:', element.r_no);
        }
    })

    // Close the unordered list tag in the output string
    output += '</ul>'

    // Update the displayed count of selected rooms
    updateRoomCount();
}
function onResponseForReceptionistAvailability(response) {
    // Extract the text from the response object and return it
    return response.text();
}

var refButton = document.getElementById("bookingbtn");
refButton.addEventListener("click", function (event) {


    const checkin = new Date(document.getElementById("booking-in-date").value).toJSON();
    const checkout = new Date(document.getElementById("booking-out-date").value).toJSON();
    const today = new Date().toJSON().slice(0, 10);
    const roomType = document.getElementById('room_type_select').value;

    if (checkin < today) {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    if (!checkin) {
        document.getElementById("span2").style.display = "inline";
    }
    else {
        document.getElementById("span2").style.display = "none";
    }

    if (checkout <= today) {
        document.getElementById("span3").style.display = "inline";
    }
    else {
        document.getElementById("span3").style.display = "none";
    }
    if (!checkout) {
        document.getElementById("span4").style.display = "inline";
    }
    else if (checkout <= checkin) {
        document.getElementById("span5").style.display = "inline";
        document.getElementById("span4").style.display = "none";
    }
    else {
        document.getElementById("span5").style.display = "none";
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

        fetch(`http://localhost:3000/receptionist/roomavailability?checkin_date=${checkin}&checkout_date=${checkout}&room_type=${selectedRoom}`)
            .then(onResponseForReceptionistAvailability)
            .then(onTextReadyForReceptionistAvailability);
    }

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
    room.addEventListener('click', function () {
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
// const durationDiv = document.querySelectorAll('.booking-box-summary')[3].querySelector('div:nth-child(2)');
const durationDiv = document.querySelector('#duration_of_stay');

// Function to update the dates and duration
// Function to update the dates and duration
// Function to update the dates and duration
function updateDatesAndDuration() {
    // Get the selected dates
    const checkinDate = new Date(checkinDateInput.value);
    const checkoutDate = new Date(checkoutDateInput.value);

    // Update the arrival and checkout dates
    if (checkinDateInput.value) {
        arrivalDateDiv.textContent = checkinDate.toDateString();
    } else {
        arrivalDateDiv.textContent = '----'; // This will be shown while no date is selected
    }

    if (checkoutDateInput.value) {
        checkoutDateDiv.textContent = checkoutDate.toDateString();
    } else {
        checkoutDateDiv.textContent = '----'; // This will be shown while no date is selected
    }

    // Calculate and update the duration of stay
    if (checkinDateInput.value && checkoutDateInput.value) {
        const duration = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
        durationDiv.textContent = duration;
    } else {
        durationDiv.textContent = 0; // This will be shown when no checkin AND checkout dates are selected
    }
}

// Add change event listeners to the date input elements
checkinDateInput.addEventListener('change', updateDatesAndDuration);
checkoutDateInput.addEventListener('change', updateDatesAndDuration);

// Initial update of dates and duration
updateDatesAndDuration();




// Get quote for stay
const roomCosts = {
    "standard_double": 65, // replace with actual cost
    "standard_twin": 62, // replace with actual cost
    "superior_double": 77, // replace with actual cost
    "superior_twin": 75 // replace with actual cost
};


const roomElements = document.querySelectorAll('.all_rooms_container .room');

roomElements.forEach(room => {
    room.addEventListener('click', updateCost);
});


function updateCost() {
    // Get the selected room type
    const roomType = document.getElementById('room_type_select').value;
    console.log('Selected room type:', roomType);

    // Get the check-in and check-out dates
    const checkinDate = new Date(document.getElementById('booking-in-date').value);
    const checkoutDate = new Date(document.getElementById('booking-out-date').value);
    console.log('Check-in date:', checkinDate);
    console.log('Check-out date:', checkoutDate);

    // Calculate the duration of the stay
    const duration = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    console.log('Duration of stay:', duration);

    // Count the number of selected rooms
    const selectedRooms = document.querySelectorAll('.room.selected_room').length;
    console.log('Number of selected rooms:', selectedRooms);

    // Calculate the cost
    const cost = roomCosts[roomType] * duration * selectedRooms;
    console.log('Calculated cost:', cost);

    // Display the cost
    document.querySelector('#price_of_stay').textContent = '£' + cost.toFixed(2);
}

