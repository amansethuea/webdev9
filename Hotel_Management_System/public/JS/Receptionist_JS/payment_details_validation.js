var checkinbtn = document.getElementById("complete_payment_btn");
checkinbtn.addEventListener("click", function (event) {
    var fullName = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("adr").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var cardName = document.getElementById("cname").value;
    var cardNumber = document.getElementById("ccnum").value;
    var expiryMonth = document.getElementById("expmonth").value;
    var expiryYear = document.getElementById("expyear").value;
    var cvv = document.getElementById("cvv").value;

    if (fullName == "") {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    if (/^[a-zA-Z ]*$/.test(fullName) == true) {
        document.getElementById("span2").style.display = "none";
    }
    else {
        document.getElementById("span2").style.display = "inline";
    }

    if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) == true) {
        document.getElementById("span3").style.display = "none";
    }
    else {
        document.getElementById("span3").style.display = "inline";
    }
    if (address == "") {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }
    if (city == "") {
        document.getElementById("span5").style.display = "inline";
    }
    else {
        document.getElementById("span5").style.display = "none";
    }
    if (state == "") {
        document.getElementById("span6").style.display = "inline";
    }
    else {
        document.getElementById("span6").style.display = "none";
    }
    if (state == "") {
        document.getElementById("span6").style.display = "inline";
    }
    else {
        document.getElementById("span6").style.display = "none";
    }
    if (zip == "") {
        document.getElementById("span7").style.display = "inline";
    }
    else {
        document.getElementById("span7").style.display = "none";
    }
    if (zip.length > 7) {
        document.getElementById("span18").style.display = "inline";
    }
    else {
        document.getElementById("span18").style.display = "none";
    }

    if (cardName == "") {
        document.getElementById("span8").style.display = "inline";
    }
    else {
        document.getElementById("span8").style.display = "none";
    }
    if (/^[a-zA-Z ]*$/.test(cardName) == true) {
        document.getElementById("span9").style.display = "none";
    }
    else {
        document.getElementById("span9").style.display = "inline";
    }
    if (cardNumber == "") {
        document.getElementById("span10").style.display = "inline";
    }
    else {
        document.getElementById("span10").style.display = "none";
    }
    if (cardNumber.length > 16) {
        document.getElementById("span11").style.display = "inline";
    }
    else {
        document.getElementById("span11").style.display = "none";
    }

    if (expiryMonth == "") {
        document.getElementById("span12").style.display = "inline";
    }
    else {
        document.getElementById("span12").style.display = "none";
    }
    if (expiryMonth == "January" || expiryMonth == "january" || expiryMonth == "February" || expiryMonth == "february" || expiryMonth == "March" || expiryMonth == "march" || expiryMonth == "April" || expiryMonth == "april"
        || expiryMonth == "May" || expiryMonth == "may" || expiryMonth == "June" || expiryMonth == "june" || expiryMonth == "July" || expiryMonth == "july" || expiryMonth == "August" || expiryMonth == "august"
        || expiryMonth == "September" || expiryMonth == "september" || expiryMonth == "October" || expiryMonth == "october" || expiryMonth == "November" || expiryMonth == "november" || expiryMonth == "December"
        || expiryMonth == "december") {
        document.getElementById("span13").style.display = "none";
    }
    else {
        document.getElementById("span13").style.display = "inline";
    }
    if (expiryYear == "") {
        document.getElementById("span14").style.display = "inline";
    }
    else {
        document.getElementById("span14").style.display = "none";
    }

    if (expiryYear == "2023" || expiryYear == "2024" || expiryYear == "2025" || expiryYear == "2026" || expiryYear == "2027" || expiryYear == "2028" || expiryYear == "2029" || expiryYear == "2030") {
        document.getElementById("span15").style.display = "none";
    }
    else {
        document.getElementById("span15").style.display = "inline";
    }
    if (cvv == "") {
        document.getElementById("span16").style.display = "inline";
    }
    else {
        document.getElementById("span16").style.display = "none";
    }
    if (cvv.length > 3) {
        document.getElementById("span17").style.display = "inline";
    }
    else {
        document.getElementById("span17").style.display = "none";
    }

    event.preventDefault();
});