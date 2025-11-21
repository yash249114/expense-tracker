const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const form = document.getElementById("transaction-form");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add Transaction
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const desc = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  transactions.push({
    id: Date.now(),
    description: desc,
    amount: amount,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  form.reset();

  updateUI();
});

// UI Update
function updateUI() {
  renderTransactions();
  calculateSummary();
}

// Render Transactions
function renderTransactions() {
  transactionListEl.innerHTML = "";

  transactions.slice().reverse().forEach(t => {
    const li = document.createElement("li");
    li.classList.add("transaction", t.amount > 0 ? "income" : "expense");

    li.innerHTML = `
      <span>${t.description}</span>
      <span>${formatMoney(t.amount)}
      <button class="delete-btn" onclick="removeTransaction(${t.id})">×</button>
      </span>
    `;

    transactionListEl.appendChild(li);
  });
}

// Calculate Summary
function calculateSummary() {
  const income = transactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((a, b) => a + b.amount, 0);
  const balance = income + expense;

  balanceEl.textContent = formatMoney(balance);
  incomeAmountEl.textContent = formatMoney(income);
  expenseAmountEl.textContent = formatMoney(expense);
}

// Remove Transaction
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
}

function formatMoney(num) {
  return "$" + num.toFixed(2);
}

// DARK MODE
document.getElementById("darkModeBtn").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".container").classList.toggle("dark-mode");
};

// HIGH CONTRAST MODE
document.getElementById("contrastModeBtn").onclick = () => {
  document.body.classList.toggle("high-contrast");
  document.querySelector(".container").classList.toggle("high-contrast");
};

// INITIAL LOAD
updateUI();
