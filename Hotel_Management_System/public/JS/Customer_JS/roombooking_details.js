/* wrap up the data */
function createData(no_of_rooms, arrival_date, checkout_date, duration, total_cost, room_data) {
    const data = {
        no_of_rooms: no_of_rooms,
        arrival_date: arrival_date,
        checkout_date: checkout_date,
        duration: duration,
        total_cost: total_cost,
        room_data: room_data
    };
    return data;
}

var refButton = document.getElementById("reserve_room_btn");
refButton.addEventListener("click", function (event) {

    const checkin = new Date(document.getElementById("booking-in-date").value).toJSON();
    const checkout = new Date(document.getElementById("booking-out-date").value).toJSON();
    const today = new Date().toJSON().slice(0, 10);
    // Client-side JS validations for Room Booking / Book Now page
    // Check if the checkin date is of previous date than today's date
    if (checkin < today) {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    // Check if no checkin date is provided
    if (!checkin) {
        document.getElementById("span2").style.display = "inline";
    }
    else {
        document.getElementById("span2").style.display = "none";
    }
    // Check if the checkout date is of same as today's date or of previous date than today
    if (checkout <= today) {
        document.getElementById("span3").style.display = "inline";
    }
    else {
        document.getElementById("span3").style.display = "none";
    }
    // Check if the checkout date is not entered
    if (!checkout) {
        document.getElementById("span4").style.display = "inline";
    }
    // Check if the checkout date is same or of previous date than checkin date
    else if (checkout <= checkin) {
        document.getElementById("span5").style.display = "inline";
        document.getElementById("span4").style.display = "none";
    }
    else {
        document.getElementById("span5").style.display = "none";
        // Clear local storage existing data if present to avoid conflicts
        if (localStorage.getItem('roomDetails') != null) {
            console.log("Previous data found in local storage roomDetails. Clearing it first before proceeding.")
            localStorage.removeItem('roomDetails');
            const no_of_rooms = document.getElementById('roomsCount').innerText;
            const arrival_date = document.getElementById('checkinDate').innerText;
            const checkout_date = document.getElementById('checkoutDate').innerText;
            const duration = document.getElementById('duration_of_stay').innerText;
            const total_cost = document.getElementById('price_of_stay').innerText;

            // If there are multiple rooms selected by the user for a single booking
            const selectedRoomsList = document.querySelectorAll('.room.selected_room')
            roomIdList = [];
            for (let i = 0; i < selectedRoomsList.length; i++) {
                roomIdList.push(selectedRoomsList[i].id);
            }
            // Creates local storage with room booking details entered by the user
            localStorage.setItem('roomDetails', JSON.stringify(createData(no_of_rooms.trim(), arrival_date.trim(), checkout_date.trim(), duration.trim(), total_cost.trim(), roomIdList)));
            const bookingDetails = localStorage.getItem("roomDetails");
            console.log("Created new local storage data for roomDetails");
            console.log(bookingDetails);
            window.location.href = "http://localhost:3000/customer/customer_details.html";

        }
        else {
            const no_of_rooms = document.getElementById('roomsCount').innerText;
            const arrival_date = document.getElementById('checkinDate').innerText;
            const checkout_date = document.getElementById('checkoutDate').innerText;
            const duration = document.getElementById('duration_of_stay').innerText;
            const total_cost = document.getElementById('price_of_stay').innerText;

            // If there are multiple rooms selected by the user for a single booking
            const selectedRoomsList = document.querySelectorAll('.room.selected_room')
            roomIdList = [];
            for (let i = 0; i < selectedRoomsList.length; i++) {
                roomIdList.push(selectedRoomsList[i].id);
            }
            // Creates local storage with room booking details entered by the user
            localStorage.setItem('roomDetails', JSON.stringify(createData(no_of_rooms.trim(), arrival_date.trim(), checkout_date.trim(), duration.trim(), total_cost.trim(), roomIdList)));
            console.log("No previous data in local storage found for roomDetails. Creating fresh..");
            const bookingDetails = localStorage.getItem("roomDetails");
            console.log(bookingDetails);

        }
    }
    // Prevents auto submit of form on click. 
    // If not giveen, client-side validations doesn't work
    event.preventDefault();
});
