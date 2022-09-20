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

console.log(divide(0, 3))