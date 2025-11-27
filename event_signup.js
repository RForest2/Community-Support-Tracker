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

    const formData = {
        eventName,
        repName,
        repEmail,
        role
    };

    if (!eventName || !repName || !repEmail || !role) {
        alert("Please fill out all fields.");
        return;
    }

    if (!isValidEmail(repEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    console.log("Form Data:", formData);

    event.target.reset();
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
