// Stage-2
let donations = [];

function renderTable() {
  let table = document.querySelector("#donationTable");
  if (!table) {
    return;
  }

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  for (let i = 0; i < donations.length; i++) {
    let donation = donations[i];

    let row = document.createElement("tr");

    let name = document.createElement("td");
    name.textContent = donation.charityName;
    row.appendChild(name);

    let amount = document.createElement("td");
    amount.textContent = donation.donationAmount;
    row.appendChild(amount);

    let date = document.createElement("td");
    date.textContent = donation.donationDate;
    row.appendChild(date);

    let comment = document.createElement("td");
    comment.textContent = donation.donorComment;
    row.appendChild(comment);

    let deleteText = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"; // delete feature later
    deleteText.appendChild(deleteButton);
    row.appendChild(deleteText);

    table.appendChild(row);
  }
}

// Stage-1
function onSubmit(event) {
  event.preventDefault();

  let name = document.querySelector(".charityName").value;
  let amount = document.querySelector(".donationAmount").value;
  let date = document.querySelector(".donationDate").value;
  let comment = document.querySelector(".donorComment").value;

  document.querySelector(".error-charityName").textContent = "";
  document.querySelector(".error-donationAmount").textContent = "";
  document.querySelector(".error-donationDate").textContent = "";
  document.querySelector(".error-donorComment").textContent = "";
  document.querySelector(".successSubmit").textContent = "";

  let hasError = false;

  if (name === "") {
    document.querySelector(".error-charityName").textContent =
      "Please enter a name.";
    hasError = true;
  }

  if (amount === "") {
    document.querySelector(".error-donationAmount").textContent =
      "At least donate some money pls!";
    hasError = true;
  } else if (isNaN(amount) || Number(amount) <= 0) {
    document.querySelector(".error-donationAmount").textContent =
      "Donation amount must be a number and above 0!";
    hasError = true;
  }

  if (date === "") {
    document.querySelector(".error-donationDate").textContent =
      "Please select a date.";
    hasError = true;
  }

  if (comment === "") {
    document.querySelector(".error-donorComment").textContent =
      "Please enter a comment.";
    hasError = true;
  }

  if (!hasError) {
    let donation = {
      charityName: name,
      donationAmount: Number(amount),
      donationDate: date,
      donorComment: comment,
    };

    donations.push(donation);

    try {
      localStorage.setItem("donations", JSON.stringify(donations));
      console.log("Saved donations to localStorage:", donations);
    } catch (error) {
      console.error("Error with saving pls check!", error);
    }

    renderTable();

    console.log("Donation saved:", donation);
    document.querySelector(".successSubmit").textContent =
      "Donation submitted!";
  }
}

if (typeof window !== "undefined") {
  const form = document.querySelector(".donationForm");
  if (form) {
    form.addEventListener("submit", onSubmit);
  }

  let stored = localStorage.getItem("donations");
  if (stored !== null) {
    donations = JSON.parse(stored);
    console.log("Loaded donations!", donations);
  } else {
    donations = [];
    console.error("Error with loading!", error);
  }
  renderTable();
} else {
  module.exports = { onSubmit, renderTable, donations };
}
