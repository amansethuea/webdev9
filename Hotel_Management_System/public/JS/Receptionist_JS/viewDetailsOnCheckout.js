function onTextReadyForCheckoutDetails(text) {
    console.log(text);
    const data = JSON.parse(text);

    let output = '<ul> ';
    data.results.forEach(element => {
        // console.log(element);
        output += 
        `<li>  Customer Name: ${element.c_name} Check-in Date: ${element.checkin} Checkout Date: ${element.checkout} Total Booking Cost: ${element.b_cost} Total Outstanding Amount: ${element.b_outstanding}  </li>`;
    })
    output += '</ul>'

    const results = document.querySelector('#checkoutsummary');
    results.innerHTML =
        ` <h3> Results </h3>
      <h6> rows count: ${data.rows} </h6>
      <ul> ${output} </ul>
    `;

}

function onResponseForCheckoutDetails(response) {
    return response.text();
}

var refButton = document.getElementById("checkoutbtn");
refButton.addEventListener("click", function (event) {
    const ref_no = document.getElementById('referenceno').value;
    const checkout = document.getElementById('checkoutdate').value;
    console.log(ref_no)
    console.log(checkout)
    fetch(`http://localhost:3000/receptionist/checkoutdetails?b_ref=${ref_no}&checkout_date=${checkout}`)
        .then(onResponseForCheckoutDetails)
        .then(onTextReadyForCheckoutDetails);
    event.preventDefault();
});

