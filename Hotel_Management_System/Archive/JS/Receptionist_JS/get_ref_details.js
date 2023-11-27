
/* process the returned data */
function onTextReady(text){
    console.log(text);
    const results = document.querySelector('#refresults');
    results.textContent = text;
    results.className = "postRed";
}

/* first callback function */
function onResponse(response){	
	return response.text();
}

/* process onSubmit event */
function processSubmit(e) {
    e.preventDefault();
    
    fetch('http://localhost:3000/refno')
    .then(onResponse)
    .then(onTextReady);
  
}

const form = document.querySelector('#form2');
form.addEventListener('submit', processSubmit);