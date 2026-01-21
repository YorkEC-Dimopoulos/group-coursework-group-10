/*
// The following JavaScript code has been authored by Konstantinos Granis
// Member of Group 10
*/

function link(event) {
    // Hide all other text elements
    const allText = document.getElementsByTagName('p');
    for (var i = 0; i<allText.length; i++) {
        if (allText[i].id == "instructions") {
            allText[i].style.display = "block";
        } else {
            allText[i].style.display = "none";
        }
    }
    // Show text item relevant to picture
    var text = document.getElementById(event+"T");
    //console.log(event, text); // Debug
    text.style.display = "block";
}