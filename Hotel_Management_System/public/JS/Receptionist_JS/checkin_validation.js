var refButton = document.getElementById("refbtn");
refButton.addEventListener("click", function(event){
    var referenceno = document.getElementById("referenceno").value;
    if (referenceno == "") {
        document.getElementById("span5").style.display = "inline";
    }
    else {
        document.getElementById("span5").style.display = "none";
    } 
    if (referenceno.length >= 1 &&  referenceno.length < 5) {
        document.getElementById("span6").style.display = "inline";
        document.getElementById("span8").style.display = "none";
    }
    else if (referenceno.length > 5) {
        document.getElementById("span8").style.display = "inline";
        document.getElementById("span6").style.display = "none";
    }
    else {
        document.getElementById("span6").style.display = "none";
        document.getElementById("span8").style.display = "none";
    }

    event.preventDefault();
});