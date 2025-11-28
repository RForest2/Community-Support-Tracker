const { JSDOM } = require("jsdom");
const { validateForm, processForm, handleSubmit } = require("./script");

// Test: Data processing returns the correct object
test("processForm returns correct temporary data object", () => {
    const result = processForm(
        "Innovation Event",
        "Allan Simpson",
        "allan@rrc.com",
        "Volunteer"
    );

    expect(result).toEqual({
        eventName: "Innovation Event",
        repName: "Alan Simpson",
        repEmail: "alan@rrc.com",
        role: "Volunteer"
    });
});

// test validator identifies required empty fields
test("validateForm identifies empty required fields", () => {
    const result = validateForm("", "", "", "");

    expect(result.errors.eventName).toBe("Event name is required");
    expect(result.errors.repName).toBe("Representative name is required");
    expect(result.errors.repEmail).toBe("Email is required");
    expect(result.errors.role).toBe("Role is required");
});

// test validator flags invalid email format
test("validateForm flags invalid email format", () => {
    const result = validateForm(
        "Event Name",
        "John Doe",
        "not-an-email",
        "Student"
    );

    expect(result.errors.repEmail).toBe("Invalid email format");
});

// test submitting valid form updates temporary object correctly
test("handleSubmit updates temporary object when form is valid", () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <form id="eventForm">
            <input id="eventName" value="Innovation House">
            <input id="repName" value="Tuan">
            <input id="repEmail" value="tuan@rrc.com">
            <select id="role">
                <option value="Student" selected>Student</option>
            </select>

            <div id="eventNameError"></div>
            <div id="repNameError"></div>
            <div id="repEmailError"></div>
            <div id="roleError"></div>
        </form>
    `);

    global.document = dom.window.document;

    const result = handleSubmit();

    expect(result).toEqual({
        eventName: "Innovation House",
        repName: "Tuan",
        repEmail: "tuan@rrc.com",
        role: "Student"
    });
});

// test errors appear in DOM when user submits invalid form
test("handleSubmit shows error messages in the DOM when fields are missing", () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <form id="eventForm">
            <input id="eventName" value="">
            <input id="repName" value="">
            <input id="repEmail" value="">
            <select id="role">
                <option value="" selected></option>
            </select>

            <div id="eventNameError"></div>
            <div id="repNameError"></div>
            <div id="repEmailError"></div>
            <div id="roleError"></div>
        </form>
    `);

    global.document = dom.window.document;

    handleSubmit();

    expect(document.getElementById("eventNameError").textContent)
        .toBe("Event name is required");

    expect(document.getElementById("repNameError").textContent)
        .toBe("Representative name is required");

    expect(document.getElementById("repEmailError").textContent)
        .toBe("Email is required");

    expect(document.getElementById("roleError").textContent)
        .toBe("Role is required");
});
