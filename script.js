const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const categoryEl = document.getElementById("category");
const modeToggle = document.getElementById("mode-toggle");

// Correct local storage key
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    description: descriptionEl.value.trim(),
    amount: parseFloat(amountEl.value),
    category: categoryEl.value
  };

  transactions.push(transaction);
  saveAndRender();
  transactionFormEl.reset();
}

function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSummary();
  updateChart();
}

function updateSummary() {
  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expenses);
}

function updateTransactionList() {
  transactionListEl.innerHTML = "";

  [...transactions].reverse().forEach(transaction => {
    const li = document.createElement("li");
    li.classList.add("transaction", transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
      <span>${transaction.description} • <small>${transaction.category}</small></span>
      <span>${formatCurrency(transaction.amount)}
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      </span>
    `;
    transactionListEl.appendChild(li);
  });
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveAndRender();
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
    .format(number);
}

// ----------------- CHART -----------------
let chart;

function updateChart() {
  const categories = {};
  transactions.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });

  const labels = Object.keys(categories);
  const data = Object.values(categories);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Expenses by Category",
        data,
      }],
    }
  });
}

// ----------------- DARK MODE -----------------
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark") ? "☀ Light Mode" : "🌙 Dark Mode";
});

// Initial render
saveAndRender();
