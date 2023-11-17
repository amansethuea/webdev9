var availButton = document.getElementById("checkavailbtn");
availButton.addEventListener("click", function(event){
    var usercheckindate = new Date(document.getElementById("checkindate").value).toJSON().slice(0, 10);
    var usercheckoutdate = new Date(document.getElementById("checkoutdate").value).toJSON().slice(0, 10);
    var today = new Date().toJSON().slice(0, 10);
    if (usercheckindate < today) {
        document.getElementById("span2").style.display = "inline";
    }
    else {
        document.getElementById("span2").style.display = "none";
    }
    if (usercheckoutdate <= today) {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }

    event.preventDefault();
});

var refButton = document.getElementById("refbtn");
refButton.addEventListener("click", function(event){
    var referenceno = document.getElementById("referenceno").value;
    if (referenceno == "") {
        document.getElementById("span5").style.display = "inline";
    }
    else {
        document.getElementById("span5").style.display = "none";
    } 

    event.preventDefault();
});