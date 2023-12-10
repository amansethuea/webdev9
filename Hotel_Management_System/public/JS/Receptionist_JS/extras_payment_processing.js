var refButton = document.getElementById("extras_payment_btn");
refButton.addEventListener("click", function (event) {
    const full_name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('adr').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const card_no = document.getElementById('ccnum').value;
    const card_expiry_month = document.getElementById('expmonth').value;
    const card_expiry_year = document.getElementById('expyear').value;
    const cvv = document.getElementById("cvv").value;
    const cardName = document.getElementById("cname").value;

    if (full_name == "") {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    if (/^[a-zA-Z ]*$/.test(full_name) == true) {
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
    if (card_no == "") {
        document.getElementById("span10").style.display = "inline";
    }
    else {
        document.getElementById("span10").style.display = "none";
    }
    if (card_no.length > 16) {
        document.getElementById("span11").style.display = "inline";
    }
    else {
        document.getElementById("span11").style.display = "none";
    }

    if (card_expiry_month == "") {
        document.getElementById("span12").style.display = "inline";
    }
    else {
        document.getElementById("span12").style.display = "none";
    }
    if (card_expiry_month == "01" || card_expiry_month == "02" || card_expiry_month == "03" || card_expiry_month == "04" || card_expiry_month == "05" || card_expiry_month == "06" || card_expiry_month == "07" || card_expiry_month == "08"
        || card_expiry_month == "09" || card_expiry_month == "10" || card_expiry_month == "11" || card_expiry_month == "12") {
        document.getElementById("span13").style.display = "none";
    }
    else {
        document.getElementById("span13").style.display = "inline";
    }
    if (card_expiry_year == "") {
        document.getElementById("span14").style.display = "inline";
    }
    else {
        document.getElementById("span14").style.display = "none";
    }
    if (card_expiry_year == "23" || card_expiry_year == "24" || card_expiry_year == "25" || card_expiry_year == "26" || card_expiry_year == "27" || card_expiry_year == "28" || card_expiry_year == "29" || card_expiry_year == "30") {
        document.getElementById("span15").style.display = "none";
    }
    else {
        document.getElementById("span15").style.display = "inline";
    }
    if (cvv == "") {
        document.getElementById("span16").style.display = "inline";
    }
    else if (cvv.length > 3) {
        document.getElementById("span17").style.display = "inline";
        document.getElementById("span16").style.display = "none";
    }
    else if (cvv.length < 3) {
        document.getElementById("span17").style.display = "inline";
        document.getElementById("span16").style.display = "none";
    }
    else {
        document.getElementById("span16").style.display = "none";
        document.getElementById("span17").style.display = "none";
        window.location.href = "http://localhost:3000/receptionist/final_checkout.html";
    }
    event.preventDefault();
});