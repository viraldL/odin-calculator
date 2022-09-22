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

clear.addEventListener("click", clearScreen);
del.addEventListener("click", delScreen);

function clearScreen() {
    screen.innerText = "";
    displayValue = Number(screen.innerText);
    displayValue = 0;
    firstValue = 0;
    secondValue = 0;
}

function delScreen() {
    if(screen.innerText.length == 1){
        screen.innerText = "";
        displayValue = Number(screen.innerText);
    } else {
        let text = screen.innerText;
        screen.innerText = text.substr(0, text.length - 1);
        displayValue = Number(screen.innerText);
    }
}

function showMath() {

}

numbersBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {   
        screen.innerText += e.target.innerText;
        displayValue = Number(screen.innerText);
    })
})

operatorsBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        clickedOperator = e.target.innerText;
        if(firstValue == 0) {
            firstValue = displayValue;
            displayValue = 0;
        } else {
            firstValue = operate(clickedOperator, firstValue, displayValue);
            displayValue = 0;
        }
        screen.innerText = "";
    })
})

enter.addEventListener("click", (e) => {
    secondValue = displayValue;
    if(!clickedOperator){
        screen.innerText = displayValue;
    } else {
    screen.innerText = operate(clickedOperator, firstValue, secondValue);
    displayValue = Number(screen.innerText)
    clickedOperator = "";
    }
})


window.onload = function() {
    screen.innerText = "";
}
window.onclick = () => {
    console.log(displayValue, firstValue, secondValue);
}

