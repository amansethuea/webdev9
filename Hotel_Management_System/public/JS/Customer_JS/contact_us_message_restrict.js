// To check the word limit of the Inquiry message
// Restricts user to enter words more than 255 chars
var content;
$('textarea').on('keyup', function () {
    var letters = $(this).val().length;
    $('#span7').text(255 - letters + " letters left");
    // limit message
    if (letters >= 255) {
        $(this).val(content);
        alert('no more than 255 letters, please!');
    } else {
        content = $(this).val();
    }
});