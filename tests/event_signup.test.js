const { JSDOM } = require("jsdom");
const { isValidEmail, handleEventSignup, initEventSignup } = require("../js/event_signup");

test("isValidEmail correctly validates emails", () => {
    expect(isValidEmail("tuan@rrc.com")).toBe(true);
    expect(isValidEmail("scam-email")).toBe(false);
});

test("handleEventSignup returns correct object with valid inputs", () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <form class="event-signup-form">
            <input id="eventName">
            <input id="repName">
            <input id="repEmail">
            <select id="role">
                <option value="">--Select Role--</option>
                <option value="sponsor">Sponsor</option>
                <option value="participant">Participant</option>
                <option value="organizer">Organizer</option>
            </select>
        </form>
    `);
    global.document = dom.window.document;
    global.window = dom.window;

    document.getElementById("eventName").value = "Innovation Event";
    document.getElementById("repName").value = "Tuan";
    document.getElementById("repEmail").value = "tuan@rrc.com";
    document.getElementById("role").value = "participant";

    const fakeEvent = { preventDefault: jest.fn() };
    const result = handleEventSignup(fakeEvent);

    expect(result).toEqual({
        eventName: "Innovation Event",
        repName: "Tuan",
        repEmail: "tuan@rrc.com",
        role: "participant"
    });
});

test("handleEventSignup returns error for empty fields", () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <form class="event-signup-form">
            <input id="eventName">
            <input id="repName">
            <input id="repEmail">
            <select id="role">
                <option value="">--Select Role--</option>
            </select>
        </form>
    `);
    global.document = dom.window.document;
    global.window = dom.window;

    const fakeEvent = { preventDefault: jest.fn() };
    const result = handleEventSignup(fakeEvent);

    expect(result).toBe("Please fill out all fields.");
});

test("handleEventSignup returns error for invalid email", () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <form class="event-signup-form">
            <input id="eventName" value="Event Name">
            <input id="repName" value="John">
            <input id="repEmail" value="not-an-email">
            <select id="role">
                <option value="participant" selected>Participant</option>
            </select>
        </form>
    `);
    global.document = dom.window.document;
    global.window = dom.window;

    const fakeEvent = { preventDefault: jest.fn() };
    const result = handleEventSignup(fakeEvent);

    expect(result).toBe("Please enter a valid email address.");
});

test("initEventSignup adds submit listener to the form", () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <form class="event-signup-form">
            <input id="eventName">
            <input id="repName">
            <input id="repEmail">
            <select id="role"></select>
        </form>
    `);

    global.document = dom.window.document;
    global.window = dom.window;

    const form = document.querySelector(".event-signup-form");
    const handleSpy = jest.fn();

    const { initEventSignup } = require("../js/event_signup");
    form.addEventListener("submit", handleSpy);

    initEventSignup();

    const submitEvent = new dom.window.Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    expect(handleSpy).toHaveBeenCalled();
});
