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
        return "What?";
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
const screen = document.querySelector("#screenDown")
const del = document.querySelector("#del");
const clear = document.querySelector("#clear");
const enter = document.querySelector("#enter");
const dot = document.querySelector("#dot");
const plusMinus = document.querySelector("#plusMinus");
const percentage = document.querySelector("#percentage");
const radical = document.querySelector("#radical");
const power = document.querySelector("#power");
const factorial = document.querySelector("#factorial");
const screenUp = document.querySelector("#screenUp");

//variables
let displayValue = 0;
let firstValue = 0;
let secondValue = 0;
let clickedOperator = "";
let prevOperator = "";

clear.addEventListener("click", clearScreen);
del.addEventListener("click", delScreen);
enter.addEventListener("click", hitEnter);
dot.addEventListener("click", addDot);
plusMinus.addEventListener("click", changePlusMinus);
percentage.addEventListener("click", addPercentage);
radical.addEventListener("click", squareRoot);
power.addEventListener("click", powerOfTwo);
factorial.addEventListener("click", factorialOf);

//functions
function addDot() {
    if(!screen.innerText.includes(".")){
        screen.innerText += ".";
    }
}

function clearScreen() {
    screen.innerText = 0;
    getDisplayValue();
    displayValue = 0;
    firstValue = 0;
    secondValue = 0;
    screenUp.innerText = "";
    clickedOperator = "";
    prevOperator = "";
}

function delScreen() {
    if(screen.innerText.length == 1){
        screen.innerText = 0;
        screenUp.innerText = 0;
        getDisplayValue();
    } else {
        let text = screen.innerText;
        let text2 = screenUp.innerText;
        screen.innerText = text.substr(0, text.length - 1);
        screenUp.innerText = text2.substr(0, text.length - 1);
        getDisplayValue();
    }
}

function changePlusMinus() {
    screen.innerText *= -1;
    getDisplayValue();
}

function addPercentage() {
    screen.innerText /= 100;
    getDisplayValue();
    updateScreen();
}

function squareRoot() {
    screen.innerText = Math.sqrt(Number(screen.innerText));
    getDisplayValue();
    updateScreen();
}

function powerOfTwo() {
    screen.innerText = Math.pow(Number(screen.innerText), 2);
    getDisplayValue()
    updateScreen();
}

function factorialOf() {
    let num = Number(screen.innerText);
    if(num > 15){
        alert("max factorial 15 cause of big lags")
        screen.innerText = 0;
        getDisplayValue();
        updateScreen();
    } else {
        let factorialnum = 1;
        if(num >  0) {
            for(let i = 1; i <= num; i++) {
                factorialnum *= i;
            }
            screen.innerText = factorialnum;
            getDisplayValue();
            updateScreen();
      } else {
        screen.innerText = 1;
        getDisplayValue();
        updateScreen();
      }
    }
}

function hitEnter() {
    if(screen.innerText == "What?") {
        clearScreen();
    }
        secondValue = displayValue;
        if(!prevOperator){
            screen.innerText = displayValue;
        } else {
            screen.innerText = operate(prevOperator, firstValue, displayValue);
            updateUpScreen(displayValue)
            screenUp.innerHTML += ` ${prevOperator}&nbsp;`;
            if(screen.innerText == "What?"){
                displayValue = 0;
                firstValue = displayValue;
                secondValue = 0;
                clickedOperator = "";
            } else {
                getDisplayValue();
                firstValue = displayValue;
                secondValue = 0;
                clickedOperator = "";
            }
            updateScreen()
        }
}



function updateScreen() {
    if(screen.innerText.length > 13) {
        screen.innerText = screen.innerText.substring(0, 13);      

    }
}

function updateUpScreen(num) {
    screenUp.innerText += num;
}

function getDisplayValue() {
    displayValue = Number(screen.innerText);
}



//number buttons handling
numbersBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if(screen.innerText == "What?") {
            clearScreen();
        }

        updateScreen()
        if(screen.innerText === "0" || screen.innerText == "What?") {
            screen.innerText = "";
            screen.innerText += e.target.innerText;
            getDisplayValue();
        } else {
            screen.innerText += e.target.innerText;
            getDisplayValue();
        }
    })
})

//operator buttons handling
operatorsBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if(screen.innerText == "What?") {
            clearScreen();
        }

        if(firstValue == 0) {
            prevOperator = e.target.innerText;
            firstValue = displayValue;
            updateUpScreen(firstValue);
            screenUp.innerHTML += ` ${e.target.innerText}&nbsp;`;
            displayValue = 0;
        } else {
            clickedOperator = e.target.innerText;
            if(firstValue == displayValue) {
                prevOperator = e.target.innerText;
                firstValue = displayValue;
                updateUpScreen(displayValue);
                screenUp.innerHTML += ` ${e.target.innerText}&nbsp;`;
                displayValue = 0;
            } else {
                firstValue = operate(prevOperator, firstValue, displayValue);
                if(typeof firstValue != "number"){
                    firstValue = 0;
                    displayValue = 0;
                }
                updateUpScreen(displayValue);
                screenUp.innerHTML += ` ${e.target.innerText}&nbsp;`;
                prevOperator = clickedOperator;
                displayValue = 0;
            }
        }
        screen.innerText = 0;
    })
})

//keyboard support
window.addEventListener("keydown", (e) => {
    numbersBtn.forEach(btn => {
       if(e.key === btn.dataset.key){
        btn.click();
       }
    })
    operatorsBtn.forEach(btn => {
        if(e.key === btn.dataset.key){
            btn.click();
        }
    })
    if(e.key === enter.dataset.key){
        enter.click();
    }
    if(e.key === dot.dataset.key){
        dot.click();
    }
    if(e.key === del.dataset.key){
        del.click();
    }
})

//reset on load
window.onload = function() {
    clearScreen()
}
window.onclick = () => {
    console.log(displayValue, firstValue, secondValue);
}

//!!!!FIX DZIELENIE PRZEZ 0 I NASTEPNE OPERACJE!!!!!!!
