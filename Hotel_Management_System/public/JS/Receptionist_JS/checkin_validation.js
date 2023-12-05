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

var refButton = document.getElementById("referenceno");
refButton.addEventListener("click", function(event){
    var usercheckindate = new Date(document.getElementById("checkindate").value).toJSON();
    var today = new Date().toJSON().slice(0, 10);
    if (usercheckindate < today) {
        document.getElementById("span2").style.display = "inline";
    }
    else {
        document.getElementById("span2").style.display = "none";
    }

    event.preventDefault();
});

var refButton = document.getElementById("referenceno");
refButton.addEventListener("click", function(event){
    var usercheckoutdate = new Date(document.getElementById("checkoutdate").value).toJSON();
    var today = new Date().toJSON().slice(0, 10);
    if (usercheckoutdate <= today) {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }

    event.preventDefault();
});