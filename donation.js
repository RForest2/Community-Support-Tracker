let form = document.querySelector(".donationForm");

form.addEventListener("submit", function (event) {
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

    console.log("Donation saved:", donation);
    document.querySelector(".successSubmit").textContent =
      "Donation submitted!";
  }
});
