* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(135deg, #4b79a1, #283e51);
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #e3e8ef;
}

.container {
  width: 100%;
  max-width: 1200px;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  color: #1a1b2e;
  margin-bottom: 35px;
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

h2 {
  color: #2d3748;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
}

/* BALANCE BOX */
.balance-container {
  text-align: center;
  margin-bottom: 35px;
  padding: 24px;
  background: linear-gradient(135deg, #6a82fb, #fc5c7d);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.balance-container h1 {
  font-size: 3rem;
  margin: 15px 0;
}

/* SUMMARY BOXES */
.summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.income,
.expenses {
  background-color: white;
  padding: 24px;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.income:hover,
.expenses:hover {
  transform: translateY(-2px);
}

/* UPDATED COLORS */
.income h3 {
  color: #00b894;
}

.expenses h3 {
  color: #e84393;
}

.income p {
  color: #00b894;
  font-size: 1.75rem;
  font-weight: 600;
}

.expenses p {
  color: #e84393;
  font-size: 1.75rem;
  font-weight: 600;
}

/* TRANSACTION LIST */
.transaction-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#transaction-list {
  list-style: none;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 8px;
  flex-grow: 1;
}

/* Scrollbar */
#transaction-list::-webkit-scrollbar {
  width: 8px;
}

#transaction-list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 4px;
}
#transaction-list::-webkit-scrollbar-thumb {
  background-color: #b0bec5;
  border-radius: 4px;
}
#transaction-list::-webkit-scrollbar-thumb:hover {
  background-color: #8c9ea3;
}

/* TRANSACTIONS */
.transaction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  margin-bottom: 12px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-right: 5px solid;
  transition: all 0.2s ease;
  animation: slideIn 0.3s ease;
}

.transaction.income {
  border-right-color: #00b894;
}

.transaction.expense {
  border-right-color: #e84393;
}

.transaction:hover {
  transform: translateX(4px);
}

/* DELETE BUTTON */
.transaction .delete-btn {
  background: none;
  border: none;
  color: #e84393;
  cursor: pointer;
  font-size: 1.4rem;
  opacity: 0;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 12px;
}

.transaction:hover .delete-btn {
  opacity: 1;
}

.transaction .delete-btn:hover {
  background-color: #ffebf1;
  transform: scale(1.1);
}

/* FORM */
.form-container {
  background: linear-gradient(135deg, #e9efff, #dfe7fd);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  height: 100%;
  display: flex;
  flex-direction: column;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #cbd5e1;
  border-radius: 8px;
  background-color: white;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #6a82fb;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

/* SUBMIT BUTTON */
button[type="submit"] {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #4b79a1, #6a82fb);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  margin-top: auto;
}

button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 24px;
  }

  .summary {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .balance-container h1 {
    font-size: 2.5rem;
  }
}
/* Dark Mode */
body.dark {
  background: #121212;
  color: #ffffff;
}

body.dark .container {
  background: #1e1e1e;
  color: white;
}

body.dark .transaction {
  background: #2c2c2c;
  color: white;
}

#mode-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 16px;
  border: none;
  background: #6a82fb;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}
