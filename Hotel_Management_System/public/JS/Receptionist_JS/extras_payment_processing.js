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

    // Client-side JS validations on form submission for food and drinks payment page
    // Checks if the full name is empty
    if (full_name == "") {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    // Checks if the full name contains nmumeric values
    if (/^[a-zA-Z ]*$/.test(full_name) == true) {
        document.getElementById("span2").style.display = "none";
    }
    else {
        document.getElementById("span2").style.display = "inline";
    }
    // Checks the email validity
    if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) == true) {
        document.getElementById("span3").style.display = "none";
    }
    else {
        document.getElementById("span3").style.display = "inline";
    }
    // Checks if the address is empty
    if (address == "") {
        document.getElementById("span4").style.display = "inline";
    }
    else {
        document.getElementById("span4").style.display = "none";
    }
    // Checks if the city is empty
    if (city == "") {
        document.getElementById("span5").style.display = "inline";
    }
    else {
        document.getElementById("span5").style.display = "none";
    }
    // Checks if the state is empty
    if (state == "") {
        document.getElementById("span6").style.display = "inline";
    }
    else {
        document.getElementById("span6").style.display = "none";
    }
    // Checks if the zipcode is empty
    if (zip == "") {
        document.getElementById("span7").style.display = "inline";
    }
    else {
        document.getElementById("span7").style.display = "none";
    }
    // Checks if the zip code is as per the UK zip codes 
    if (zip.length > 7) {
        document.getElementById("span18").style.display = "inline";
    }
    else {
        document.getElementById("span18").style.display = "none";
    }
    // Checks if the card name is empty
    if (cardName == "") {
        document.getElementById("span8").style.display = "inline";
    }
    else {
        document.getElementById("span8").style.display = "none";
    }
    // Checks if the card name contains any numeric values
    if (/^[a-zA-Z ]*$/.test(cardName) == true) {
        document.getElementById("span9").style.display = "none";
    }
    else {
        document.getElementById("span9").style.display = "inline";
    }
    // Checks if the card number is empty
    if (card_no == "") {
        document.getElementById("span10").style.display = "inline";
    }
    else {
        document.getElementById("span10").style.display = "none";
    }
    //Checks if the card number length is as per the actual card length which is 16 digit
    if (card_no.length > 16) {
        document.getElementById("span11").style.display = "inline";
    }
    else {
        document.getElementById("span11").style.display = "none";
    }
    // Checks if the card expiry month is empty
    if (card_expiry_month == "") {
        document.getElementById("span12").style.display = "inline";
    }
    else {
        document.getElementById("span12").style.display = "none";
    }
    // Checks if the card expiry month is within the range (1-12) where 1 denotes as January till 12 i.e December
    if (card_expiry_month == "01" || card_expiry_month == "02" || card_expiry_month == "03" || card_expiry_month == "04" || card_expiry_month == "05" || card_expiry_month == "06" || card_expiry_month == "07" || card_expiry_month == "08"
        || card_expiry_month == "09" || card_expiry_month == "10" || card_expiry_month == "11" || card_expiry_month == "12") {
        document.getElementById("span13").style.display = "none";
    }
    else {
        document.getElementById("span13").style.display = "inline";
    }
    // Checks if the card expiry year is empty
    if (card_expiry_year == "") {
        document.getElementById("span14").style.display = "inline";
    }
    else {
        document.getElementById("span14").style.display = "none";
    }
    // Checks if the card expiry year is within the range (23-30) where 23 denotes to year 2023 till 30 i.e year 2030
    if (card_expiry_year == "23" || card_expiry_year == "24" || card_expiry_year == "25" || card_expiry_year == "26" || card_expiry_year == "27" || card_expiry_year == "28" || card_expiry_year == "29" || card_expiry_year == "30") {
        document.getElementById("span15").style.display = "none";
    }
    else {
        document.getElementById("span15").style.display = "inline";
    }
    // Checks if the CVV is empty
    if (cvv == "") {
        document.getElementById("span16").style.display = "inline";
    }
    // Checks if the CVV is greater than the actual length of CVV i.e 3
    else if (cvv.length > 3) {
        document.getElementById("span17").style.display = "inline";
        document.getElementById("span16").style.display = "none";
    }
    // Checks if the CVV is smaller than the actual length of CVV i.e 3
    else if (cvv.length < 3) {
        document.getElementById("span17").style.display = "inline";
        document.getElementById("span16").style.display = "none";
    }
    else {
        document.getElementById("span16").style.display = "none";
        document.getElementById("span17").style.display = "none";
        // If validations pass, directs the user to the final checkout page
        window.location.href = "http://localhost:3000/receptionist/final_checkout.html";
    }
    // Prevents the auto submit of the form/page on submit button click
    // If not give, client-side validation won't work
    event.preventDefault();
});