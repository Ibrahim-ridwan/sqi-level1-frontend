let network = document.getElementById("network");
let amount = document.getElementById("amount");
let generatedPin = document.getElementById("code");

let generateBtn = document.querySelector("#generate");
let saveBtn = document.querySelector("#savePin");

let rechargeCode = document.querySelector("#rechargeCode");
let rechargeBtn = document.querySelector("#recharge");

let tableBody = document.getElementById("tableBody");

let rechargeCards = [];

// Generate the random recharge pin

function generatePin() {     //generate random number
    if (network.value !== "" && amount.value !== "") {
        let pin = Math.floor((Math.random() * 9000000000)) + 1000000000;
        generatedPin.value = pin;
    } else {
        alert("Please select network and amount");
    }
}

// Array function to store the card details

function cardDetails() {

    if (!generatedPin.value.trim()) {
        return;
    }

    let pinExists = rechargeCards.find(function(card) {
        return card.pin == generatedPin.value;
    });

    if (pinExists) {
        return;
    }

    let card = {
        network: network.value,
        amount: amount.value,
        pin: generatedPin.value,
        status: "Unused",
        dateCreated: new Date().toLocaleDateString(),
        dateUsed: "Not used yet"
    };

    rechargeCards.push(card);

    displayCards();

    generatedPin.value = "";
}

// Function to update the table

function displayCards() {
    tableBody.innerHTML = "";

    rechargeCards.forEach(function(card, index) {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${card.network}</td>
            <td>${card.amount}</td>
            <td>*310*${card.pin}#</td>
            <td>${card.status}</td>
            <td>${card.dateCreated}</td>
            <td>${card.dateUsed}</td>
            <td>
                <button class="del-btn" onclick="del(${index})">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Delete function inside the table

function del(info) {
    rechargeCards.splice(info, 1);

    displayCards();
}

// Pin Validation and Recharge functionality

function codeValidation() {
    let enteredPin = rechargeCode.value.trim();

    enteredPin = enteredPin.substr(5,10);

    let card = rechargeCards.find((card) => card.pin == enteredPin);

    if (!card) {
        alert("Invalid PIN!");

    } else if (card.status == "Used") {
        alert("PIN has already been used!");

    } else {
        card.status = "Used";
        card.dateUsed = new Date().toLocaleDateString();

        alert("Recharge successfully!");

        displayCards();

        rechargeCode.value = ""

    }
}