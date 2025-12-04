const { JSDOM } = require("jsdom");
const { handleEventSignup, deleteSignup, initEventSignup, saveSignup } = require("../js/event_signup");

function setupDOM() {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
            <body>
                <form class="event-signup-form">
                    <input type="text" id="eventName" />
                    <input type="text" id="repName" />
                    <input type="email" id="repEmail" />
                    <select id="role">
                        <option value="">--Select Role--</option>
                        <option value="sponsor">Sponsor</option>
                        <option value="participant">Participant</option>
                        <option value="organizer">Organizer</option>
                    </select>
                    <button type="submit">Sign Up</button>
                </form>
                <div class="successSubmit" style="display: block"></div>
            </body>
        </html>
    `);
    global.document = dom.window.document;
    global.window = dom.window;
}

beforeEach(() => {
    setupDOM();
    localStorage.clear();
});

test("handleEventSignup shows 'Sign up successfully!' message in DOM", () => {
    document.getElementById("eventName").value = "Community Event";
    document.getElementById("repName").value = "Alice";
    document.getElementById("repEmail").value = "alice@example.com";
    document.getElementById("role").value = "participant";

    const result = handleEventSignup();

    const msgDiv = document.querySelector(".successSubmit");
    expect(result.eventName).toBe("Community Event");
    expect(msgDiv.textContent).toBe("Sign up successfully!");
});

test("deleteSignup shows 'Signup deleted.' message in DOM", () => {
    const signup = { eventName: "Delete Event", repName: "Del", repEmail: "del@example.com", role: "sponsor" };
    saveSignup(signup);

    document.getElementById("repEmail").value = "del@example.com";

    const deleted = deleteSignup();

    const msgDiv = document.querySelector(".successSubmit");
    expect(deleted).toEqual(signup);
    expect(msgDiv.textContent).toBe("Signup deleted.");
});
