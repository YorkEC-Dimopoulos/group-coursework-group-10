/*
// This file was authored by Konstantinos Granis
// Member of Group 10
*/

function calculate(time) {
    var kwh = document.getElementById('kwh');
    var kw = document.getElementById('kw');

    if (kwh <= 1 | kw <= 1) {
        document.getElementById("result").innerText = "Please enter a valid value above 1";
    }
    // debug
    //console.log(kwh, kw, kwh.value, kw.value);

    // take kWh, divide by kW, multiply
    //  by 0.9
    // time is a boolean variable which dictates which time format will be output
    var fractionHours = (kwh.value/kw.value)*0.9;

    // Variables to get a result for the 'sixty' var
    var hours = Math.floor(fractionHours);
    var minutes = Math.round((fractionHours - hours) * 60);

    // check minutes aren't negative
    if (minutes >= 60) {
        hours += 1;
        minutes -= 60;
    }

    // format minutes
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // sixty variable will calculate time in hours:minutes instead of fractions of an hour
    const sixty = "Chargin time (HH:MM): " + hours + ":" + formattedMinutes;
    if (time == true) {
        document.getElementById("result").innerText = sixty;
    } else {
        document.getElementById("result").innerText = "Charging time (fractional hours): "+fractionHours;
    }
    // debug
    //console.log(sixty);
}