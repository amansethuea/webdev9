var checkinbtn = document.getElementById("checkin_detail_btn");
checkinbtn.addEventListener("click", function(event){
    var guest = document.getElementById("guest").value;
    //var rooms = document.getElementById("rooms").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var mobileno = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;

    // Client-side JS validations on Guest Details page
    // Checks if the number of guest are not provided or the value is 0 
    if (guest == "" || guest == 0) {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    // Checks if the first name is empty
    if (firstname == "") {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }
    // Checks if the first name contains numeric values
    if (/^[a-zA-Z ]*$/.test(firstname) == true) {
        document.getElementById("span5").style.display = "none";
    }
    else {
        document.getElementById("span5").style.display = "inline";
    }
    // Checks if the last name is empty
    if (lastname == "") {
        document.getElementById("span6").style.display = "inline";
    }
    else {
        document.getElementById("span6").style.display = "none";
    }
    // Checks if the last name contains numeric values
    if (/^[a-zA-Z ]*$/.test(lastname) == true) {
        document.getElementById("span7").style.display = "none";
    }
    else {
        document.getElementById("span7").style.display = "inline";
    }
    // Checks if mobile number validity
    // Checks if the mobile number contains any alphabets or exceeds the length of 11 i.e including a 0 as a prefix for UK based numbers
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