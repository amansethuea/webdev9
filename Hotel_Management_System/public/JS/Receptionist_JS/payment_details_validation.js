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

    

    event.preventDefault();
});