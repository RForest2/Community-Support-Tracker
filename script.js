/*
    Name:Reese Forest
    Date: Nov 22, 2025
    About: Creating a Volunteering Hours Tracker using a Form
*/

// Creating the Form and linking it with the HTML Element
const form = document.getElementById("volunteerHoursForm");

// Preventing the default behaviour
form.addEventListener("submit", (event) =>{
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    for(const el of errorMessages){
        el.remove();
    }
})