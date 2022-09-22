//main functions

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    if(a == 0 || b == 0){
        return "oops error!"
    } else return a / b;
}

//operate function

const operate = function(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);

        case "-":
            return subtract(a, b);

        case "x":
            return multiply(a, b);

        case "/":
            return divide(a, b);

        default:
            return "error";
    }
}

//buttons
const operatorArray = ["+", "-", "x", "/"];
const numbersBtn = document.querySelectorAll(".number");
const operatorsBtn = document.querySelectorAll(".operator"); 
const screen = document.querySelector("#screen")
const del = document.querySelector("#del");
const clear = document.querySelector("#clear");
const enter = document.querySelector("#enter");

let displayValue = 0;
let firstValue = 0;
let secondValue = 0;
let clickedOperator = "";
let prevOperator = "";

clear.addEventListener("click", clearScreen);
del.addEventListener("click", delScreen);
enter.addEventListener("click", hitEnter)

function clearScreen() {
    screen.innerText = 0;
    displayValue = Number(screen.innerText);
    displayValue = 0;
    firstValue = 0;
    secondValue = 0;
}

function delScreen() {
    if(screen.innerText.length == 1){
        screen.innerText = 0;
        displayValue = Number(screen.innerText);
    } else {
        let text = screen.innerText;
        screen.innerText = text.substr(0, text.length - 1);
        displayValue = Number(screen.innerText);
    }
}

function hitEnter() {
    secondValue = displayValue;
    if(!prevOperator){
        screen.innerText = displayValue;
    } else {
    screen.innerText = operate(prevOperator, firstValue, displayValue);
    Number(screen.innerText)
    displayValue = Number(screen.innerText);
    firstValue = displayValue;
    secondValue = 0;
    clickedOperator = "";
    updateScreen()
    }
}

function updateScreen() {
    if(screen.innerText.length > 13) {
        screen.innerText = screen.innerText.substring(0, 13);
    }
}




numbersBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        updateScreen()
        if(screen.innerText == 0) {
            screen.innerText = "";
            screen.innerText += e.target.innerText;
            displayValue = Number(screen.innerText);

        } else {
            screen.innerText += e.target.innerText;
            displayValue = Number(screen.innerText);

        }

    })
})

operatorsBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if(firstValue == 0) {
            prevOperator = e.target.innerText;
            firstValue = displayValue;
            displayValue = 0;
        } else {
            clickedOperator = e.target.innerText;
            if(firstValue == displayValue) {
                prevOperator = e.target.innerText;
                firstValue = displayValue;
                displayValue = 0;
            } else {
                firstValue = operate(prevOperator, firstValue, displayValue);
                prevOperator = clickedOperator;
                displayValue = 0;
            }
        }
        screen.innerText = 0;
    })
})



window.onload = function() {
    screen.innerText = 0;
}
window.onclick = () => {
    console.log(displayValue, firstValue, secondValue);
}

