/*
    Name:Reese Forest
    Date: Nov 22, 2025
    About: Creating a Volunteering Hours Tracker using a HTML/JS Form
*/

// Creating the Form and linking it with the HTML Element
const form = document.getElementById("volunteerHoursForm");

// Preventing the default behaviour
form.addEventListener("submit", (event) =>{
    event.preventDefault();

    // Creating a cookie object for the form fields
    function setCookie(name, value, days){
        module.exports = setCookie
        let expires = "2";
        if(days){
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    // Getting elements using the DOM
    const getCharityName = document.getElementById("charity-name");
    const getHoursVolunteered = document.getElementById("hours-volunteered");
    const getCurrentDate = document.getElementById("current-date");
    const getRating = document.getElementById("rating");

    // Event listener for saving data to our cookie (yum)
    function saveToCookie() {
        form.addEventListener("click", () => {
        const charityNameInput = getCharityName.value;
        if(charityNameInput.value != ("")) {
            setCookie("charity_name", charityNameInput, 2);
        } else {
            alert("Please enter a charity name");
        }

        const hoursVolunteeredInput = getHoursVolunteered.value;
        if(isNaN(hoursVolunteeredInput) || hoursVolunteeredInput < 0) {
            setCookie("hours_volunteered", hoursVolunteeredInput, 2);
        } else{
            alert("Please enter the hours volunteered for");
        }

        const currentDateInput = getCurrentDate.value;
        if(currentDateInput.value != "") {
            setCookie("current_date", currentDateInput, 2);
        } else {
            alert("Please enter the date");
        }

        const ratingInput = getRating.value;
        if(ratingInput) {
            setCookie("rating_input", ratingInput);
        } else {
            alert("Be sure to rate your experience!");
        }
    })
    }
    
})