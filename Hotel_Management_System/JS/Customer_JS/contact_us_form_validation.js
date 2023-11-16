document.getElementById("contact_us_form").addEventListener("submit", onSubmitClick);
function onSubmitClick(event) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mobileno = document.getElementById("mobile").value;
    var message = document.getElementById("message").value;

    //blank name check
    if (name == "") {
        document.getElementById("span1").style.display = "inline";
        document.getElementById("name").setAttribute("class", "class1");
    }
    else {
        document.getElementById("span1").style.display = "none";
        document.getElementById("name").setAttribute("class", "class2");
    }
    // name check on alphabets
    if (/^[a-zA-Z ]*$/.test(name) == true) {
        document.getElementById("span2").style.display = "none";
        document.getElementById("name").setAttribute("class", "class2");
    }
    else {
        document.getElementById("span2").style.display = "inline";
        document.getElementById("name").setAttribute("class", "class1");
    }
    // email check validation including blank field check
    if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) == true) {
        document.getElementById("span3").style.display = "none";
        document.getElementById("email").setAttribute("class", "class2");
    }
    else {
        document.getElementById("span3").style.display = "inline";
        document.getElementById("email").setAttribute("class", "class1");
    }
    // phone check validation including blank field check
    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobileno) == true) {
        document.getElementById("span4").style.display = "none";
        document.getElementById("mobile").setAttribute("class", "class2");
    }
    else {
        document.getElementById("span4").style.display = "inline";
        document.getElementById("mobile").setAttribute("class", "class1");
    }
    // Blank Inquiry message
    if (message == "") {
        document.getElementById("span5").style.display = "inline";
        document.getElementById("message").setAttribute("class", "class1");
    }
    // Inquiry message too long check
    else if (message.length > 255) {
        document.getElementById("span6").style.display = "inline";
        document.getElementById("message").setAttribute("class", "class1");

    }
    else {
        document.getElementById("span5").style.display = "none";
        document.getElementById("span6").style.display = "none";
        document.getElementById("message").setAttribute("class", "class2");
    }

    event.preventDefault();
}
