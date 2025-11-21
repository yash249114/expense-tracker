// Elements
const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const categoryEl = document.getElementById("category");
const modeToggle = document.getElementById("mode-toggle");
const ctx = document.getElementById("categoryChart").getContext("2d");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let categoryChart = null;

transactionFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);
  const category = categoryEl.value;

  if (!description || isNaN(amount)) return;

  const tx = { id: Date.now(), description, amount, category };
  transactions.push(tx);
  persistRender();
  transactionFormEl.reset();
  descriptionEl.focus();
});

function persistRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderAll();
}

function renderAll() {
  renderTransactionList();
  renderSummary();
  renderChart();
}

function renderTransactionList() {
  transactionListEl.innerHTML = "";
  if (transactions.length === 0) {
    transactionListEl.innerHTML = '<li style="color:var(--muted)">No transactions yet</li>';
    return;
  }

  [...transactions].reverse().forEach(tx => {
    const li = document.createElement("li");
    li.className = "transaction " + (tx.amount >= 0 ? "income" : "expense");

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `<strong>${escapeHtml(tx.description)}</strong><small>${escapeHtml(tx.category)}</small>`;

    const right = document.createElement("div");
    const amt = document.createElement("div");
    amt.className = "amount";
    amt.textContent = formatCurrency(tx.amount);

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.setAttribute("aria-label", "Delete transaction");
    del.textContent = "✕";
    del.onclick = () => { removeTransaction(tx.id); };

    right.appendChild(amt);
    right.appendChild(del);

    li.appendChild(meta);
    li.appendChild(right);
    transactionListEl.appendChild(li);
  });
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});
}

function renderSummary() {
  const balance = transactions.reduce((s,t)=>s + Number(t.amount || 0), 0);
  const income = transactions.filter(t=>t.amount>0).reduce((s,t)=>s + Number(t.amount), 0);
  const expenses = transactions.filter(t=>t.amount<0).reduce((s,t)=>s + Number(t.amount), 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expenses);
}

// Chart: show income & expense per category (absolute numbers)
function renderChart() {
  const buckets = {};
  transactions.forEach(t=>{
    if(!buckets[t.category]) buckets[t.category] = { income:0, expense:0 };
    if (t.amount >= 0) buckets[t.category].income += t.amount;
    else buckets[t.category].expense += Math.abs(t.amount);
  });

  const labels = Object.keys(buckets);
  const incomeData = labels.map(l => buckets[l].income);
  const expenseData = labels.map(l => buckets[l].expense);

  const data = {
    labels,
    datasets: [
      { label: "Income", backgroundColor: "#10b981", data: incomeData },
      { label: "Expenses", backgroundColor: "#ef4444", data: expenseData }
    ]
  };

  if (categoryChart) categoryChart.destroy();
  categoryChart = new Chart(ctx, {
    type: "bar",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "top" } },
      scales: {
        x: { stacked: true, grid: { display:false } },
        y: { stacked: true, beginAtZero:true }
      }
    }
  });
}

function removeTransaction(id){
  transactions = transactions.filter(t => t.id !== id);
  persistRender();
}

function formatCurrency(n){
  return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD' }).format(n);
}

/* Dark mode handling */
function loadMode() {
  const saved = localStorage.getItem("dark-mode");
  if (saved === "true") {
    document.body.classList.add("dark");
    modeToggle.textContent = "☀";
    modeToggle.setAttribute("aria-pressed","true");
  } else {
    document.body.classList.remove("dark");
    modeToggle.textContent = "🌙";
    modeToggle.setAttribute("aria-pressed","false");
  }
}

modeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  modeToggle.textContent = isDark ? "☀" : "🌙";
  modeToggle.setAttribute("aria-pressed", String(isDark));
  localStorage.setItem("dark-mode", isDark ? "true" : "false");
});

/* Init */
loadMode();
renderAll();
