/*  Reese Forest
    Dec 3, 2025
    JS Jest Tests for Stage 2 of the Volunteer Hours Tracker */

const {JSDOM} = require("jsdom");

// Setting up the needed functions for testing out the code
const {
    renderTable,
    hours,
    calculateHours,
} = require("../js/hours_tracker");

// Test #1: Volunteer Hours table is updated as expected when data is added to localStorage
test("Table updates when data is added to localStorage", () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <body>
            <form id="volunteerHoursForm" action ="" method="post">
                <div class="input-container">
                <label for="charity-name">Charity Name:</label>
                <input type="text" id="charity-name" name="charity-name">

                <label for="hours-volunteered">Hours volunteered:</label>
                <input type="number" class="hoursVolunteered" name="hours-volunteered" id="hours-volunteered">

                <label for="date">Current Date:</label>
                <input type="date" value="YYYY-MM-DD" name="current-date" id="current-date">

                <!-- Creating the 1 to 5 rating scale -->
                <fieldset class="rating">
                <input type="radio" name="rating" id="1-star"/> 1 star<label for="1-star"</label>
                <input type="radio" name="rating" id="2-star"/> 2 stars<label for="2-star"</label>
                <input type="radio" name="rating" id="3-star"/> 3 stars<label for="3-star"</label>
                <input type="radio" name="rating" id="4-star"/> 4 stars<label for="4-star"</label>
                <input type="radio" name="rating" id="5-star"/> 5 stars<label for="5-star"</label>
                </fieldset>
                </div>
                <button type="submit">Submit</button>
            </form>
            
            <h2>Volunteer Hours Records</h2>
            <table id="volunteerHoursTable">
                <tr>
                    <th>Charity Name:</th>
                    <th>Hours Volunteered:</th>
                    <th>Current Date:</th>
                    <th>Experience Rating:</th>
                    <th>Delete Log</th>
                </tr>
            </table>
            <label>Total Hours: <span id="totalHours"></span></label>
        </body>
        `);

        global.document = dom.window.document;

        global.localStorage = {
            store: {},
            setItem(key, value) {
                this.store[key] = value;
            },
            getItem(key) {
                return this.store[key] || null;
            },
        };

        hours.length = 0;

        const form = document.querySelector(".volunteerHoursForm");
        form.addEventListener("submit", renderTable);

        form.dispatchEvent(
            new dom.window.Event("submit", {bubbles : true, cancelable : true})
        );

        const table = document.querySelector("#volunteerHoursTable");

        expect(table.rows.length).toBe(2);
        expect(table.rows[1].cells[0].textContent).toBe("100");

        const saved = JSON.parse(localStorage.getItem(hours));
        expect(saved.length).toBe(1);
        expect(saved[0].charityNameInput).toBe("Reese");
    });