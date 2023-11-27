var checkinbtn = document.getElementById("complete_payment_btn");
checkinbtn.addEventListener("click", function (event) {
    var fullName = document.getElementById("fname").value;
    // blank check on name
    if (fullName == "") {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    // name check on alphabets
    if (/^[a-zA-Z ]*$/.test(fullName) == true) {
        document.getElementById("span2").style.display = "none";
    }
    else {
        document.getElementById("span2").style.display = "inline";
    }
    event.preventDefault();
});