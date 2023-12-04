function onTextReady(text) {
    console.log(text);
    const data = JSON.parse(text);

    let output = '<ul> ';
    data.results.forEach(element => {
        // console.log(element);
        output += `<li>  Customer Name: ${element.c_name} Ref No: ${element.b_ref}  Checkin: ${element.checkin}  Checkout: ${element.checkout} Total Cost: ${element.b_cost} Outstanding Cost: ${element.b_outstanding}  </li>`;
    })
    output += '</ul>'

    const results = document.querySelector('#results');
    results.innerHTML =
        ` <h3> Results </h3>
      <h6> rows count: ${data.rows} </h6>
      <ul> ${output} </ul>
    `;

}

function onResponse(response) {
    return response.text();
}

var refButton = document.getElementById("refbtn");
refButton.addEventListener("click", function (event) {
    const referenceNo = document.getElementById('referenceno').value;
    const checkin = document.getElementById('checkindate').value;
    const checkout = document.getElementById('checkoutdate').value;
    console.log(referenceNo)
    fetch(`http://localhost:3000/receptionist/refno?b_ref=${referenceNo}&checkin_date=${checkin}&checkout_date=${checkout}`)
        .then(onResponse)
        .then(onTextReady);
    event.preventDefault();
});

