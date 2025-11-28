function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleEventSignup(event) {
    event.preventDefault();

    const eventName = document.getElementById('eventName').value.trim();
    const repName = document.getElementById('repName').value.trim();
    const repEmail = document.getElementById('repEmail').value.trim();
    const role = document.getElementById('role').value;

    if (!eventName || !repName || !repEmail || !role) {
        return "Please fill out all fields.";
    }

    if (!isValidEmail(repEmail)) {
        return "Please enter a valid email address.";
    }

    return { eventName, repName, repEmail, role };
}

function initEventSignup() {
    const form = document.querySelector(".event-signup-form");
    if (form) {
        form.addEventListener("submit", handleEventSignup);
    }
}

if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", initEventSignup);
} else {
    module.exports = { isValidEmail, handleEventSignup, initEventSignup };
}
