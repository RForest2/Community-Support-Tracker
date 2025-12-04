const { JSDOM } = require("jsdom");
const {
  onSubmit,
  renderTable,
  donations,
  calculateTotal,
} = require("../donation");

/*
  Test 1:
  Test that the donation table updates ok.
*/
test("test-1", () => {
  const dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
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

        <h2>Donation Records</h2>
        <table id="donationTable">
          <tr>
            <th>Charity Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Comment</th>
            <th>Delete</th>
          </tr>
        </table>
        <label>Total Amount: <span id="totalAmount"></span></label>
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

  donations.length = 0;

  const form = document.querySelector(".donationForm");
  form.addEventListener("submit", onSubmit);

  form.dispatchEvent(
    new dom.window.Event("submit", { bubbles: true, cancelable: true })
  );

  const table = document.querySelector("#donationTable");

  expect(table.rows.length).toBe(2);
  expect(table.rows[1].cells[0].textContent).toBe("Jimmy");
  expect(table.rows[1].cells[1].textContent).toBe("100");

  const saved = JSON.parse(localStorage.getItem("donations"));
  expect(saved.length).toBe(1);
  expect(saved[0].charityName).toBe("Jimmy");
});

/*
  Test 2:
  Test that data persisted in localStorage is correct
*/
test("test-2", () => {
  const dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <h2>Donation Records</h2>
        <table id="donationTable">
          <tr>
            <th>Charity Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Comment</th>
            <th>Delete</th>
          </tr>
        </table>
        <label>Total Amount: <span id="totalAmount"></span></label>
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

  const fakeData = [
    {
      charityName: "test",
      donationAmount: 50,
      donationDate: "2025-12-01",
      donorComment: "test",
    },
    {
      charityName: "test",
      donationAmount: 50,
      donationDate: "2025-12-01",
      donorComment: "test",
    },
  ];

  localStorage.setItem("donations", JSON.stringify(fakeData));

  donations.length = 0;

  const stored = localStorage.getItem("donations");
  if (stored !== null) {
    const parsed = JSON.parse(stored);
    for (let i = 0; i < parsed.length; i++) {
      donations.push(parsed[i]);
    }
  }

  renderTable();

  const table = document.querySelector("#donationTable");
  expect(table.rows.length).toBe(3);
  expect(table.rows[1].cells[0].textContent).toBe("test");
  expect(table.rows[2].cells[0].textContent).toBe("test");
});

/*
  Test 3:
  Test total calculate is working
*/
test("Test-3", () => {
  donations.length = 0;
  donations.push(
    { donationAmount: 30 },
    { donationAmount: 40 },
    { donationAmount: 50 }
  );

  const total = calculateTotal();
  expect(total).toBe(120);
});

/*
  Test 4:
  Test that delete is working
*/
test("test-4", () => {
  const dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <table id="donationTable">
          <tr>
            <th>Charity Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Comment</th>
            <th>Delete</th>
          </tr>
        </table>
        <label>Total Amount: <span id="totalAmount"></span></label>
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

  donations.length = 0;
  donations.push(
    {
      charityName: "test",
      donationAmount: 50,
      donationDate: "2025-12-01",
      donorComment: "test",
    },
    {
      charityName: "test",
      donationAmount: 50,
      donationDate: "2025-12-01",
      donorComment: "test",
    }
  );

  renderTable();

  const table = document.querySelector("#donationTable");
  const buttons = table.querySelectorAll("button");

  buttons[0].click();

  expect(donations.length).toBe(1);
  expect(donations[0].charityName).toBe("test");

  const stored = JSON.parse(localStorage.getItem("donations"));
  expect(stored.length).toBe(1);
  expect(stored[0].charityName).toBe("test");
});

/*
  Test 5:
  total+delete working together ok
*/
test("test-5", () => {
  const dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <table id="donationTable">
          <tr>
            <th>Charity Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Comment</th>
            <th>Delete</th>
          </tr>
        </table>
        <label>Total Amount: <span id="totalAmount"></span></label>
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

  donations.length = 0;
  donations.push(
    {
      charityName: "test",
      donationAmount: 50,
      donationDate: "2025-12-01",
      donorComment: "1",
    },
    {
      charityName: "test",
      donationAmount: 50,
      donationDate: "2025-12-01",
      donorComment: "1",
    }
  );

  renderTable();

  const totalSpan = document.querySelector("#totalAmount");
  expect(totalSpan.textContent).toBe("100");

  const table = document.querySelector("#donationTable");
  const buttons = table.querySelectorAll("button");

  buttons[0].click();

  expect(totalSpan.textContent).toBe("50");
});
