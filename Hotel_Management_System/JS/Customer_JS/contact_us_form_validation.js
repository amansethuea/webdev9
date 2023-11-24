document.getElementById("contact_us_form").addEventListener("submit", onSubmitClick);
function onSubmitClick(event) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mobileno = document.getElementById("mobile").value;
    var message = document.getElementById("message").value;

    //blank name check
    if (name == "") {
        document.getElementById("span1").style.display = "inline";
    }
    else {
        document.getElementById("span1").style.display = "none";
    }
    // name check on alphabets
    if (/^[a-zA-Z ]*$/.test(name) == true) {
        document.getElementById("span2").style.display = "none";
    }
    else {
        document.getElementById("span2").style.display = "inline";
    }
    // email check validation including blank field check
    if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) == true) {
        document.getElementById("span3").style.display = "none";
    }
    else {
        document.getElementById("span3").style.display = "inline";
    }
    // phone check validation including blank field check
    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobileno) == true) {
        document.getElementById("span4").style.display = "none";
    }
    else {
        document.getElementById("span4").style.display = "inline";
    }
    // Blank Inquiry message
    if (message == "") {
        document.getElementById("span5").style.display = "inline";
    }
    // Inquiry message too long check
    else if (message.length > 255) {
        document.getElementById("span6").style.display = "inline";

    }
    else {
        document.getElementById("span5").style.display = "none";
        document.getElementById("span6").style.display = "none";
        document.body.innerHTML = `<h2>Thank you ${name} for contacting us. We will get in touch soon. Re-directing to Contact us page in 5 seconds..</h2>`
        window.setTimeout(function () {
            window.location.href = "contact_us.html";
        }, 5000);
    }

    event.preventDefault();
}
