/* wrap up the data */
function createData(no_of_rooms, arrival_date, checkout_date, duration, total_cost) {
    const data = {
        no_of_rooms: no_of_rooms,
        arrival_date: arrival_date,
        checkout_date: checkout_date,
        duration: duration,
        total_cost: total_cost
    };
    return data;
}

var refButton = document.getElementById("reserve_room_btn");
refButton.addEventListener("click", function (event) {
    const no_of_rooms = document.getElementById('roomsCount').innerText;
    const arrival_date = document.getElementById('checkinDate').innerText;
    const checkout_date = document.getElementById('checkoutDate').innerText;
    const duration = document.getElementById('duration_of_stay').innerText;
    const total_cost = document.getElementById('price_of_stay').innerText;
    localStorage.setItem('roomDetails', JSON.stringify(createData(no_of_rooms.trim(), arrival_date.trim(), checkout_date.trim(), duration.trim(), total_cost.trim())));
    window.location.href="http://localhost:3000/customer/customer_details.html";
    event.preventDefault();
});
