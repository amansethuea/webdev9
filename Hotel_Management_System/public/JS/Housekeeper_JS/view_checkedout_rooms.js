function onHousekeeperTextReady(text){
    console.log(text);
    const data = JSON.parse(text);
    console.log('Response data:', data.results); // Log the response data

    // Get all room elements
    const allRooms = document.querySelectorAll('.housekeeper_individual_room_container');

    // Create a set of room numbers from the response data for quick lookup
    // Convert room numbers to strings
    const roomNumbers = new Set(data.results.map(element => element.r_no.toString()));
    console.log('Room numbers:', roomNumbers); // Log the room numbers

    // Iterate over all room elements
    allRooms.forEach(room => {
        // If the room's id is in the response data, show the room
        if (roomNumbers.has(room.id)) {
            room.style.display = "flex";
        }
        // If the room's id is not in the response data, hide the room
        else {
            room.style.display = "none";
        }
    });

}

function onHousekeeperResponse(response){
    return response.text();
}

var refButton = document.getElementById("grab_rooms");
refButton.addEventListener("click", function (event) {
 
    fetch('http://localhost:3000/housekeeper/notAvailableRoomInfo')
    .then(onHousekeeperResponse)
    .then(onHousekeeperTextReady);
    event.preventDefault();
});

document.getElementById('confirm_clean').addEventListener('click', function() {
    // Get all cleaned rooms
    const cleanedRooms = document.querySelectorAll('input[value="icon2"]:checked');
    if (!cleanedRooms.length) {
        console.log('No room selected');
        return;
    }

    // Iterate over cleaned rooms
    cleanedRooms.forEach(cleanedRoom => {
        const roomNumber = cleanedRoom.closest('.housekeeper_individual_room_container').id;

        // Send a fetch request to the server for each cleaned room
        fetch('/api/housekeeper/updateCleanedRoomToAvail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ room_no: roomNumber }) // Pass room number in the request body
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Update the status on the client side
                cleanedRoom.closest('.housekeeper_individual_room_container').classList.remove('selected');
                cleanedRoom.checked = false;
                document.getElementById('grab_rooms').click(); // Acts as a refresh to press the get rooms buttons

                // Select all radio buttons with value "icon1"
                const radioButtons = document.querySelectorAll('input[type="radio"][value="icon1"]');

                // Iterate over the radio buttons and set their checked property to true
                // This is required to stop rooms from being 'grabbed' and the not cleaned button being unchecked
                radioButtons.forEach(radioButton => {
                    radioButton.checked = true;
                });



            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

});

// Get all radio buttons with value "icon2"
const radioButtons = document.querySelectorAll('input[value="icon2"]');

// Add an event listener to each radio button
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function() {
        // Remove 'selected' class from any previously selected room
        const selectedRoom = document.querySelector('.housekeeper_individual_room_container.selected');
        if (selectedRoom) {
            selectedRoom.classList.remove('selected');
        }

        // Add 'selected' class to the parent div of the toggled radio button
        this.closest('.housekeeper_individual_room_container').classList.add('selected');
    });
});