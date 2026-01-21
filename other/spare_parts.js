/*
// The following JavaScript code has been authored by Konstantinos Granis
// Member of Group 10
*/

function showDescription(elemID) {
    //console.log(elemID); // Debug
    // Hide everything
    const descriptions = document.getElementsByClassName('description');
    for (i = 0; i < descriptions.length; i++) {
        descriptions[i].style.display = "none";
    }
    // Construct text ID
    // and display description
    var item = document.getElementById(elemID+"-text");
    //console.log(item); // Debug
    item.style.display = "block";
}
