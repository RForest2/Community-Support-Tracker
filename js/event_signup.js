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

    const signup = { eventName, repName, repEmail, role };

    saveSignup(signup);
    updateTable();
    updateSummary();
    showMessage("Sign up successfully!", false);
    toggleDeleteButton();

    return signup;
}

function showMessage(msg, isError = false) {
    const div = document.querySelector(".successSubmit");
    div.style.display = "block";
    div.textContent = msg;
    div.style.color = isError ? "red" : "green";
}

function saveSignup(signup) {
    let signups = JSON.parse(localStorage.getItem("signups") || "[]");
    signups.push(signup);
    localStorage.setItem("signups", JSON.stringify(signups));
}

function deleteSignup() {
    const currentEmail = document.getElementById('repEmail').value.trim();
    let signups = JSON.parse(localStorage.getItem("signups") || "[]");
    signups = signups.filter(s => s.repEmail !== currentEmail);
    localStorage.setItem("signups", JSON.stringify(signups));
    updateTable();
    updateSummary();
    showMessage("Signup deleted.", false);
    toggleDeleteButton();
}

function updateTable() {
    const tbody = document.querySelector("#signupTable tbody");
    tbody.innerHTML = "";
    const signups = JSON.parse(localStorage.getItem("signups") || "[]");
    signups.forEach(signup => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${signup.eventName}</td>
            <td>${signup.repName}</td>
            <td>${signup.repEmail}</td>
            <td>${signup.role}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updateSummary() {
    const summary = document.getElementById("summaryList");
    summary.innerHTML = "";
    const signups = JSON.parse(localStorage.getItem("signups") || "[]");
    const roles = {};
    signups.forEach(s => {
        roles[s.role] = (roles[s.role] || 0) + 1;
    });
    for (const role in roles) {
        const li = document.createElement("li");
        li.textContent = `${role}: ${roles[role]}`;
        summary.appendChild(li);
    }
}

function toggleDeleteButton() {
    const currentEmail = document.getElementById('repEmail').value.trim();
    const btn = document.getElementById("deleteSignupBtn");
    const signups = JSON.parse(localStorage.getItem("signups") || "[]");
    const found = signups.some(s => s.repEmail === currentEmail);
    btn.style.display = found ? "inline-block" : "none";
}

function initEventSignup() {
    const form = document.querySelector(".event-signup-form");
    if (form) {
        form.addEventListener("submit", handleEventSignup);
    }

    const deleteBtn = document.getElementById("deleteSignupBtn");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", deleteSignup);
    }

    updateTable();
    updateSummary();
    toggleDeleteButton();
}

if (typeof window === "undefined") {
    module.exports = {
        isValidEmail,
        handleEventSignup,
        saveSignup,
        updateTable,
        updateSummary,
        deleteSignup,
        toggleDeleteButton
    };
} else {
    document.addEventListener("DOMContentLoaded", initEventSignup);
}
