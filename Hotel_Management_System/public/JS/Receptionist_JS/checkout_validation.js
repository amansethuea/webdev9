var checkinbtn = document.getElementById("checkoutbtn");
checkinbtn.addEventListener("click", function (event) {
    var mobileno = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;
    var referenceno = document.getElementById("referenceno").value;
    
    if (mobileno == "" && email == "" && referenceno == "") {
        document.getElementById("span7").style.display = "inline";
    }
    else {
        document.getElementById("span7").style.display = "none";
    }

    if (referenceno >=1 && referenceno.length < 16) {
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
    if (mobileno.length >= 1) {
        if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobileno) == true) {
            document.getElementById("span5").style.display = "none";
        }
        else {
            document.getElementById("span5").style.display = "inline";
        }
    }
    // email check validation including blank field check
    if (email.length > 1) {
        if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) == true) {
            document.getElementById("span9").style.display = "none";
        }
        else {
            document.getElementById("span9").style.display = "inline";
        }
    }

    event.preventDefault();
});