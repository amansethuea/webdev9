var checkinbtn = document.getElementById("checkoutbtn");
checkinbtn.addEventListener("click", function (event) {
    var referenceno = document.getElementById("referenceno").value;
    
    if (referenceno >=1 && referenceno.length < 5) {
        document.getElementById("span2").style.display = "inline";
        document.getElementById("span8").style.display = "none";
    }
    else if (referenceno.length > 16) {
        document.getElementById("span8").style.display = "inline";
        document.getElementById("span2").style.display = "none";
    }
    else {
        document.getElementById("span2").style.display = "none";
        document.getElementById("span8").style.display = "none";
    }

    event.preventDefault();
});