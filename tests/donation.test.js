const { JSDOM } = require("jsdom");
const { onSubmit } = require("../donation");

global.localStorage = {
  store: {},
  setItem(key, value) {
    this.store[key] = value;
  },
  getItem(key) {
    return this.store[key] || null;
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

// name empty
test("shows error when charity name is empty", () => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <form class="donationForm">
      <input type="text" class="charityName" value="" />
      <span class="error-charityName"></span>

      <input type="text" class="donationAmount" value="100" />
      <span class="error-donationAmount"></span>

      <input type="date" class="donationDate" value="2025-11-22" />
      <span class="error-donationDate"></span>

      <textarea class="donorComment">Test</textarea>
      <span class="error-donorComment"></span>

      <div class="successSubmit"></div>
      <button type="submit">Submit</button>
    </form>
  `);

  global.document = dom.window.document;
  const form = document.querySelector(".donationForm");

  form.addEventListener("submit", onSubmit);

  form.dispatchEvent(
    new dom.window.Event("submit", { bubbles: true, cancelable: true })
  );

  expect(document.querySelector(".error-charityName").textContent).toBe(
    "Please enter a name."
  );
});

// amount negative
test("shows error when donation amount is negative", () => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <form class="donationForm">
      <input type="text" class="charityName" value="Jimmy" />
      <span class="error-charityName"></span>

      <input type="text" class="donationAmount" value="-10" />
      <span class="error-donationAmount"></span>

      <input type="date" class="donationDate" value="2025-11-22" />
      <span class="error-donationDate"></span>

      <textarea class="donorComment">Test</textarea>
      <span class="error-donorComment"></span>

      <div class="successSubmit"></div>
      <button type="submit">Submit</button>
    </form>
  `);

  global.document = dom.window.document;
  const form = document.querySelector(".donationForm");

  form.addEventListener("submit", onSubmit);

  form.dispatchEvent(
    new dom.window.Event("submit", { bubbles: true, cancelable: true })
  );

  expect(document.querySelector(".error-donationAmount").textContent).toBe(
    "Donation amount must be a number and above 0!"
  );
});

// no date
test("shows error when date is missing", () => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <form class="donationForm">
      <input type="text" class="charityName" value="Jimmy" />
      <span class="error-charityName"></span>

      <input type="text" class="donationAmount" value="100" />
      <span class="error-donationAmount"></span>

      <input type="date" class="donationDate" value="" />
      <span class="error-donationDate"></span>

      <textarea class="donorComment">Test</textarea>
      <span class="error-donorComment"></span>

      <div class="successSubmit"></div>
      <button type="submit">Submit</button>
    </form>
  `);

  global.document = dom.window.document;
  const form = document.querySelector(".donationForm");

  form.addEventListener("submit", onSubmit);

  form.dispatchEvent(
    new dom.window.Event("submit", { bubbles: true, cancelable: true })
  );

  expect(document.querySelector(".error-donationDate").textContent).toBe(
    "Please select a date."
  );
});

// no comment
test("shows error when comment is missing", () => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <form class="donationForm">
      <input type="text" class="charityName" value="Jimmy" />
      <span class="error-charityName"></span>

      <input type="text" class="donationAmount" value="100" />
      <span class="error-donationAmount"></span>

      <input type="date" class="donationDate" value="2025-11-22" />
      <span class="error-donationDate"></span>

      <textarea class="donorComment"></textarea>
      <span class="error-donorComment"></span>

      <div class="successSubmit"></div>
      <button type="submit">Submit</button>
    </form>
  `);

  global.document = dom.window.document;
  const form = document.querySelector(".donationForm");

  form.addEventListener("submit", onSubmit);

  form.dispatchEvent(
    new dom.window.Event("submit", { bubbles: true, cancelable: true })
  );

  expect(document.querySelector(".error-donorComment").textContent).toBe(
    "Please enter a comment."
  );
});

// test ok
test("shows success message when all inputs are valid", () => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <form class="donationForm">
      <input type="text" class="charityName" value="Jimmy" />
      <span class="error-charityName"></span>

      <input type="text" class="donationAmount" value="100" />
      <span class="error-donationAmount"></span>

      <input type="date" class="donationDate" value="2025-11-22" />
      <span class="error-donationDate"></span>

      <textarea class="donorComment">Test ok</textarea>
      <span class="error-donorComment"></span>

      <div class="successSubmit"></div>
      <button type="submit">Submit</button>
    </form>
  `);

  global.document = dom.window.document;
  const form = document.querySelector(".donationForm");

  form.addEventListener("submit", onSubmit);

  form.dispatchEvent(
    new dom.window.Event("submit", { bubbles: true, cancelable: true })
  );

  expect(document.querySelector(".successSubmit").textContent).toBe(
    "Donation submitted!"
  );
});
