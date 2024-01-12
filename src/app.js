const buttons = document.querySelectorAll("button");
const equals = document.querySelector("#equals");
const reset = document.querySelector("#reset");
const result = document.querySelector("#result");
const negative = document.querySelector("#negative");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
const percent = document.querySelector("#percent");
const decimal = document.querySelector("#decimal");
let opOne = 0;
let opTwo = 0;
let prevOpTwo = 0;
let operator = null;
let prevOperator = null;
let prevResult = 0;
let length = 0;

document.addEventListener("keydown", (event) => {
    const key = event.key;
    
    if (!isNaN(key) || key === '.') {
        number(key);
    } else if (key === '+') {
        operation(add.innerText);
        activate(add);
    } else if (key === '-') {
        operation(subtract.innerText);
        activate(subtract);
    } else if (key === '*') {
        operation(multiply.innerText);
        activate(multiply);
    } else if (key === '/') {
        operation(divide.innerText);
        activate(divide);
    } else if (key === '%') {
        operation(percent.innerText);
        result.innerText = parseFloat(opOne / 100);
        prevResult = result.innerText;
        opOne = parseFloat(result.innerText);
        opTwo = 0;
        operator = null;
        length = 0;
        error();
    } else if (key === 'Enter') {
        if (opTwo == 0 && operator == null){
            repeatOperation()
        } else{
            makeOperation();
        }
        operator = null;
        length = 0;
        error();
    } else if (key === 'Escape') {
        result.innerText = 0;
        opOne = 0;
        opTwo = 0;
        prevOpTwo = 0;
        operator = null;
        prevResult = 0;
        result.style.fontSize = "3em";
        length = 0;
        buttons.forEach(function (button) {
            button.classList.remove('await');
        });
        buttons.disabled = false;
    }
});

function error() {
    if (result.innerText.includes("e") || result.innerText.includes(NaN)) {
        result.innerText = "err";
        result.style.fontSize = "3em";
        buttons.disabled = true;
        reset.disabled = false;
    } else if (result.innerText.length > 17) {
        result.style.fontSize = "1em";
    } else if (result.innerText.length > 10) {
        result.style.fontSize = "2em";
    }  else if (result.innerText.length <= 10) {
        result.style.fontSize = "3em";
    }
}

function number(num) {
    if (length < 10) {
        result.style.fontSize = "3em";
        if (result.innerText !== "0.") {
            if (result.innerText === "0" && num === ".") {
                result.innerText = result.innerText + '.';
            } else if (num !== '.' && (result.innerText === "0" || parseFloat(result.innerText) === parseFloat(opOne) || parseFloat(result.innerText) === parseFloat(prevResult) || parseFloat(result.innerText) === (parseFloat(prevResult)) * -1)) {
                result.innerText = num;
            } else if (num === '.') {
                if (parseFloat(result.innerText) === parseFloat(opOne) || parseFloat(result.innerText) === parseFloat(prevResult) || parseFloat(result.innerText) === (parseFloat(prevResult)) * -1) {
                    result.innerText = "0.";
                } else if (!result.innerText.includes(".")) {
                    result.innerText = result.innerText + '.';
                }
            } else {
                result.innerText += num;
            }
        } else if (result.innerText === "0." && num !== ".") {
            result.innerText += num;
        }
        length = result.innerText.length;
    }
}

function makeOperation() {
    opTwo = parseFloat(result.innerText);
    prevOpTwo = opTwo;
    buttons.forEach(function (button) {
        button.classList.remove('await');
    });
    let calculationResult;
    if (opOne == 0 && opTwo == 0) {
        calculationResult = 0;
    } else if (opOne == 0) {
        calculationResult = opTwo
    } else if (opTwo == 0) {
        calculationResult = opOne
    } else {
        if (operator === "+") {
            calculationResult = opOne + opTwo;
        } else if (operator === "-") {
            calculationResult = opOne - opTwo;
        } else if (operator === "x") {
            calculationResult = opOne * opTwo;
        } else if (operator === "÷") {
            calculationResult = opOne / opTwo;
        }
    }
    error();
    result.innerText = parseFloat(calculationResult);
    prevResult = result.innerText;
    prevOperator = operator;
    opOne = parseFloat(result.innerText);
    opTwo = 0;
}

function repeatOperation () {
    if (prevOperator === "+") {
        result.innerText = parseFloat(result.innerText) + prevOpTwo;
    } else if (prevOperator === "-") {
        result.innerText = parseFloat(result.innerText) - prevOpTwo;
    } else if (prevOperator === "x") {
        result.innerText = parseFloat(result.innerText) * prevOpTwo;
    } else if (prevOperator === "÷") {
        result.innerText = parseFloat(result.innerText) / prevOpTwo;
    }
}

function activate(thisButton) {
    buttons.forEach(function (button) {
        button.classList.remove('await');
    });
    thisButton.classList.add('await');
}

function operation(op) {
    if (operator !== null) {
        makeOperation();
    }
    length = 0;
    opOne = parseFloat(result.innerText);
    operator = op;
}

decimal.addEventListener("click", () => {
    number('.')
});

reset.addEventListener("click", () => {
    result.innerText = 0;
    opOne = 0;
    opTwo = 0;
    prevOpTwo = 0;
    operator = null;
    prevResult = 0;
    length = 0;
    result.style.fontSize = "3em";
    buttons.forEach(function (button) {
        button.classList.remove('await');
    });
    buttons.disabled = false;
});

negative.addEventListener("click", () => {
    result.innerText = parseFloat(result.innerText) * (-1);
});

equals.addEventListener("click", () => {
    if (opTwo == 0 && operator == null){
        repeatOperation()
    } else{
        makeOperation();
    }
    operator = null;
    length = 0;
    error();
});

add.addEventListener("click", () => {
    operation(add.innerText);
    activate(add);
});

subtract.addEventListener("click", () => {
    operation(subtract.innerText);
    activate(subtract);
});

multiply.addEventListener("click", () => {
    operation(multiply.innerText);
    activate(multiply);
});

divide.addEventListener("click", () => {
    operation(divide.innerText);
    activate(divide);
});

percent.addEventListener("click", () => {
    operation(percent.innerText);
    result.innerText = parseFloat(opOne / 100);
    prevResult = result.innerText;
    opOne = parseFloat(result.innerText);
    opTwo = 0;
    operator = null;
    length = 0;
    error();
});

buttons.forEach(function (button) {
    if (button.id.startsWith("button")) {
        button.addEventListener("click", () => {
            number(button.innerText);
        });
    }
});