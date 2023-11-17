var checkinbtn = document.getElementById("checkin_detail_btn");
checkinbtn.addEventListener("click", function(event){
    var guest = document.getElementById("guest").value;
    var rooms = document.getElementById("rooms").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var mobileno = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;

    
    if (guest == "" || guest == 0) {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    if (guest > 3) {
        document.getElementById("span2").style.display = "inline";
    }
    else {
        document.getElementById("span2").style.display = "none";
    }
    if (rooms == "" || rooms == 0) {
        document.getElementById("span3").style.display = "inline";
    }
    else {
        document.getElementById("span3").style.display = "none";
    }
    if (firstname == "") {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }
    if (/^[a-zA-Z ]*$/.test(firstname) == true) {
        document.getElementById("span5").style.display = "none";
    }
    else {
        document.getElementById("span5").style.display = "inline";
    }

    if (lastname == "") {
        document.getElementById("span6").style.display = "inline";
    }
    else {
        document.getElementById("span6").style.display = "none";
    }
    if (/^[a-zA-Z ]*$/.test(lastname) == true) {
        document.getElementById("span7").style.display = "none";
    }
    else {
        document.getElementById("span7").style.display = "inline";
    }
    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobileno) == true) {
        document.getElementById("span8").style.display = "none";
    }
    else {
        document.getElementById("span8").style.display = "inline";
    }
    // email check validation including blank field check
    if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) == true) {
        document.getElementById("span9").style.display = "none";
    }
    else {
        document.getElementById("span9").style.display = "inline";
    }
 
    event.preventDefault();
});