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
let operator = null;
let prevResult = 0;
let length = 0;

function number(n) {
    if (length < 10) {
        if (result.innerText !== "0.") {
            if (result.innerText === "0" && n == ".") {
                result.innerText = result.innerText + '.';
            } else if (result.innerText === "0" || parseFloat(result.innerText) === parseFloat(opOne) || parseFloat(result.innerText) === parseFloat(prevResult) || parseFloat(result.innerText) === (parseFloat(prevResult)) * -1) {
                result.innerText = n;
            } else if (n == '.') {
                if (!result.innerText.includes(".")) {
                    result.innerText = result.innerText + '.';
                } else if (parseFloat(result.innerText) === parseFloat(opOne) || parseFloat(result.innerText) === parseFloat(prevResult) || parseFloat(result.innerText) === (parseFloat(prevResult)) * -1) {
                    result.innerText = "0.";
                }
            } else {
                result.innerText += n;
            }
        } else if (result.innerText === "0.") {
            result.innerText += n;
        }
        length = result.innerText.length;
    }
}

function makeOperation() {
    opTwo = parseFloat(result.innerText);
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
    result.innerText = parseFloat(calculationResult);
    prevResult = result.innerText;
    opOne = parseFloat(result.innerText);
    opTwo = 0;
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
    operator = null;
    prevResult = 0;
    length = 0;
    buttons.forEach(function (button) {
        button.classList.remove('await');
    });
});

negative.addEventListener("click", () => {
    result.innerText = parseFloat(result.innerText) * (-1);
});

equals.addEventListener("click", () => {
    makeOperation();
    operator = null;
    length = 0;
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
});

buttons.forEach(function (button) {
    if (button.id.startsWith("button")) {
        button.addEventListener("click", () => {
            number(button.innerText);
        });
    }
});