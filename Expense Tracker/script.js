let transactions = JSON.parse(localStorage.getItem("transactions")) || []

const form = document.querySelector("#transaction-form");
const descriptionInput = document.querySelector(".description");
const amountInput = document.querySelector(".amount");
const typeInputs = document.querySelectorAll('input[name="type"]');

// const transactions = [];


const incomeDisplay = document.querySelector("#income");
const expenseDisplay = document.querySelector("#expense");
const balanceDisplay = document.querySelector("#balance");

transactions.forEach(displayTransaction);
updateSummary();


form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    let type = "";

    // Get which radio button is selected
    typeInputs.forEach(input => {
        if (input.checked) {
            type = input.value;
        }
    });

    if (description === "" || isNaN(amount)) {
        alert("Please fill in both fields correctly.");
        return;
    }

    // Create transaction object
    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };


    transactions.push(transaction);// Push to transactions array
    displayTransaction(transaction); // Display it on screen
    updateSummary();
    saveTransaction();
    form.reset();
});


function displayTransaction(transaction) {
    const list = document.querySelector("#history-list");

    //Create li element
    const item = document.createElement("li");

    item.style.color = transaction.type === "income" ? "green" : "red";

    const descSpan = document.createElement("span");
    descSpan.textContent = transaction.description;

    // Create amount span
    const amountSpan = document.createElement("span");
    amountSpan.textContent = transaction.amount.toFixed(2)

    descSpan.style.marginRight = "10px";


    item.appendChild(descSpan);
    item.appendChild(amountSpan);

    // Append list item to ul
    list.appendChild(item);

}


function updateSummary() {
    const income = transactions

        // Filter selects only specific items from an array . Used for getting only "income" or "expense" transaction

        // Reduce combines all the values in a array into single result .Used for adding up all the amounts 
        // This is a method used on arrays.

        // It reduces the array to a single value (e.g., total sum, product, etc.).It takes two arguments:
        // 1.  A callback function.
        // 2. An initial value (optional, but usually necessary).

        // 0 (second argument of reduce)
        // This is the initial value for sum.
        // If you don’t pass this, the first element of the array is used by default (not always safe).
        // Here, we want to start from 0 (for summing numbers), so we explicitly pass it.

        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    incomeDisplay.textContent = `₹${income.toFixed(2)}`;
    expenseDisplay.textContent = `₹${expense.toFixed(2)}`;
    balanceDisplay.textContent = `₹${balance.toFixed(2)}`;

}

function saveTransaction(){
    localStorage.setItem("transactions",JSON.stringify(transactions));
}