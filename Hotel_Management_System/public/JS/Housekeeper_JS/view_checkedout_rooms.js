function onHousekeeperTextReady(text){
    console.log(text);
    const data = JSON.parse(text);

    let output = '<ul> '; 
    data.results.forEach(element => {
        // console.log(element);
        output += `<li>  Room No: ${element.r_no } </li>`;
    }) 
    output += '</ul>'
 
    const results = document.querySelector('#narooms');
    results.innerHTML = 
    ` <h3> Results </h3>
      <h6> rows count: ${data.rows} </h6>
      <ul> ${output} </ul>
    `;

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