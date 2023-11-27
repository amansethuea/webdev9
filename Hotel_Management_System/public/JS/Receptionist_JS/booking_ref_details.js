function onTextReady(text) {
    console.log(text);
    const data = JSON.parse(text);

    let output = '<ul> ';
    data.results.forEach(element => {
        // console.log(element);
        output += `<li>  Room ID: ${element.r_no}  Checkin: ${element.checkin}  Checkout: ${element.checkout} </li>`;
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
    console.log(referenceNo)
    fetch(`http://localhost:3000/receptionist/refno?b_ref=${referenceNo}`)
        .then(onResponse)
        .then(onTextReady);
    event.preventDefault();
});

