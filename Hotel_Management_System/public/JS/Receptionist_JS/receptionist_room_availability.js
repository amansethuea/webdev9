function onTextReadyForAvailability(text) {
    console.log(text);
    const data = JSON.parse(text);

    let output = '<ul> ';
    data.results.forEach(element => {
        // console.log(element);
        output += `<li>  Room ID: ${element.r_no}  Room Type: ${element.r_class}  </li>`;
    })
    output += '</ul>'

    const results = document.querySelector('#roomavailable');
    results.innerHTML =
        ` <h3> Results </h3>
      <h6> rows count: ${data.rows} </h6>
      <ul> ${output} </ul>
    `;

}

function onResponseForAvailability(response) {
    return response.text();
}

var refButton = document.getElementById("checkavailbtn");
refButton.addEventListener("click", function (event) {
    const checkin = document.getElementById('checkindate').value;
    const checkout = document.getElementById('checkoutdate').value;
    console.log(checkin)
    console.log(checkout)
    fetch(`http://localhost:3000/receptionist/roomavailability?checkin_date=${checkin}&checkout_date=${checkout}`)
        .then(onResponseForAvailability)
        .then(onTextReadyForAvailability);
    event.preventDefault();
});

