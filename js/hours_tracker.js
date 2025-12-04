/*
    Name:Reese Forest
    Date: Nov 22, 2025
    About: Creating a Volunteering Hours Tracker using a HTML/JS Form.
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

    let error = false;

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
    if (!error) {
        let goodSubmission = {
            getCharityName: charityNameInput ,
            getHoursVolunteered: Number(hoursVolunteeredInput),
            getCurrentDate: currentDateInput,
            ratingInput: getRating,
        };

        hours.push(goodSubmission);
    }
} })

// Stage 2 START
let hours = [];

function calculateHours(){
    let total = 0;
    for(let i = 0; i < hours.length; i++) {
        total = total + hours[i].hoursVolunteered;
    }
    return total;
}

function updateTable() {
    let totalSpan = document.querySelector("#totalHours");
    if(!totalSpan) {
        return;
    }
    totalSpan.textContent = calculateHours();
}

function renderTable() {
    let table = document.querySelector("#volunteerHoursTable");
    if(!table) {
        return;
    }

    while(table.rows.length > 1) {
        table.deleteRow(1);
    }

    for(let i = 0; i < hours.length; i++) {
        let totalHours = hours[i];

        let row = document.createElement("tr");

        let charityNameInput = document.createElement("td");
        charityNameInput.textContent = goodSubmission.getCharityName;
        row.appendChild(charityNameInput);

        let hoursVolunteeredInput = document.createElement("td");
        hoursVolunteeredInput.textContent = goodSubmission.getHoursVolunteered;
        row.appendChild(hoursVolunteeredInput);

        let currentDateInput = document.createElement("td");
        currentDateInput.textContent = goodSubmission.getCurrentDate;
        row.appendChild(currentDateInput);

        let ratingInput = document.createElement("td");
        ratingInput.textContent = goodSubmission.getRating;
        row.appendChild(ratingInput);

        let deleteText = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.dataset.index = i;

        deleteButton.addEventListener.addEventListener("click", function (){
            let index = Number(this.dataset.index);
            hours.splice(index, 1);

            try {
                localStorage.setItem("hours", JSON.stringify(hours));
                console.log("Deleted", hours);
            } catch(error) {
                console.error("Error with deleting", error);
            }

            renderTable();
        })

        deleteText.appendChild(deleteButton);
        row.appendChild(deleteText);

        table.appendChild(row);
    }

    updateTable();
}