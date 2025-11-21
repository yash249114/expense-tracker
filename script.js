const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const categoryEl = document.getElementById("category");
const modeToggle = document.getElementById("mode-toggle");

// LocalStorage key
let transactions = JSON.parse(localStorage.getItem("transactions-data")) || [];

// Add Transaction
transactionFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    description: descriptionEl.value.trim(),
    amount: parseFloat(amountEl.value),
    category: categoryEl.value,
  };

  transactions.push(transaction);
  saveRender();
  transactionFormEl.reset();
});

// Save + Render
function saveRender() {
  localStorage.setItem("transactions-data", JSON.stringify(transactions));
  renderTransactions();
  updateSummary();
  updateChart();
}

// Update Summary
function updateSummary() {
  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const income = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expenses);
}

// Render List
function renderTransactions() {
  transactionListEl.innerHTML = "";

  [...transactions].reverse().forEach(t => {
    const li = document.createElement("li");
    li.classList.add("transaction", t.amount > 0 ? "income" : "expense");

    li.innerHTML = `
      <span>${t.description} • <small>${t.category}</small></span>
      <span>${formatCurrency(t.amount)}
        <button class="delete-btn" onclick="deleteTransaction(${t.id})">x</button>
      </span>
    `;

    transactionListEl.appendChild(li);
  });
}

// Delete
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveRender();
}

// Format Currency
function formatCurrency(num) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(num);
}

// Chart
let chart;
function updateChart() {
  const categoryTotals = {};

  transactions.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Amount by Category",
        backgroundColor: "#6a82fb",
        data,
      }],
    },
  });
}

// Dark Mode
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark")
    ? "☀ Light Mode"
    : "🌙 Dark Mode";
});

// Initial Load
saveRender();
