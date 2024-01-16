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
let opOne = null;
let opTwo = 0;
let prevOpTwo = 0;
let operator = null;
let prevOperator = null;
let prevResult = null;
let length = 0;
let comp = 0;

document.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
        case '+':
            operation(add.innerText);
            activate(add);
            break;
        case '-':
            operation(subtract.innerText);
            activate(subtract);
            break;
        case '*':
            operation(multiply.innerText);
            activate(multiply);
            break;
        case '/':
            operation(divide.innerText);
            activate(divide);
            break;
        case '%':
            operation(percent.innerText);
            result.innerText = Math.round(parseFloat(opOne / 100));
            prevResult = result.innerText;
            opOne = parseFloat(result.innerText);
            opTwo = 0;
            operator = null;
            length = 0;
            error();
            if (result.innerText.includes(".") && result.innerText.length > 5) {
                result.innerText = parseFloat(result.innerText).toFixed(3);
                error();
            }    
            break;
        case 'Enter':
            if (opTwo == 0 && operator == null) {
                repeatOperation();
            } else {
                makeOperation();
            }
            operator = null;
            length = 0;
            comp = 0;
            error();
            break;
        case 'Escape':
            result.innerText = 0;
            opOne = null;
            opTwo = 0;
            prevOpTwo = 0;
            operator = null;
            prevResult = null;
            length = 0;
            comp = 0;
            result.style.fontSize = "3em";
            buttons.forEach(function (button) {
                button.classList.remove('await');
            });
            buttons.disabled = false;
            break;
        default:
            if (!isNaN(key) || key === '.') {
                number(key);
            }
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
    }  else {
        result.style.fontSize = "3em";
    }
}

function number(num) {
    if (length < 10) {
        result.style.fontSize = "3em";
        if (result.innerText !== "0.") {
            if (result.innerText === "0" && num === ".") {
                result.innerText = result.innerText + '.';
                comp = comp + 1;
            } else if (num !== '.' && comp === 0 && (result.innerText === "0" || parseFloat(opOne) != null || parseFloat(prevResult) != null)) {
                result.innerText = num;
                comp = comp + 1;
            } else if (num === '.') {
                if (comp === 0 && (result.innerText === "0" || parseFloat(opOne) != null || parseFloat(prevResult) != null)) {
                    result.innerText = "0.";
                    comp = comp + 1;
                } else if (!result.innerText.includes(".")) {
                    result.innerText = result.innerText + '.';
                    comp = comp + 1;
                }
            } else {
                result.innerText += num;
            }
        } else if (result.innerText === "0." && num !== ".") {
            result.innerText += num;
        }
        length = result.innerText.length;
        buttons.forEach(function (button) {
            button.classList.remove('await');
        });
    }
}

function makeOperation() {
    opTwo = parseFloat(result.innerText);
    prevOpTwo = opTwo;
    buttons.forEach(function (button) {
        button.classList.remove('await');
    });
    
    let calculationResult;

    switch (true) {
        case opOne === 0 && opTwo === 0:
            calculationResult = 0;
            break;
        default:
            switch (operator) {
                case "+":
                    calculationResult = opOne + opTwo;
                    break;
                case "-":
                    calculationResult = opOne - opTwo;
                    break;
                case "x":
                    calculationResult = opOne * opTwo;
                    break;
                case "÷":
                    calculationResult = opOne / opTwo;
                    break;
            }
    }
    error();
    result.innerText = calculationResult;
    if (result.innerText.includes(".") && result.innerText.length > 5) {
        result.innerText = parseFloat(result.innerText).toFixed(3);
        error();
    }    
    prevResult = result.innerText;
    prevOperator = operator;
    opOne = parseFloat(result.innerText);
    opTwo = 0;
}

function repeatOperation() {
    switch (prevOperator) {
        case "+":
            result.innerText = parseFloat(result.innerText) + prevOpTwo;
            break;
        case "-":
            result.innerText = parseFloat(result.innerText) - prevOpTwo;
            break;
        case "x":
            result.innerText = parseFloat(result.innerText) * prevOpTwo;
            break;
        case "÷":
            result.innerText = parseFloat(result.innerText) / prevOpTwo;
            break;
    }
    if (result.innerText.includes(".") && result.innerText.length > 5) {
        result.innerText = parseFloat(result.innerText).toFixed(3);
        error();
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
    if (parseFloat(opOne) == '0.'){
        result.innerText = 0;
    }
    operator = op;
    comp = 0;
}

decimal.addEventListener("click", () => {
    number('.')
});

reset.addEventListener("click", () => {
    result.innerText = 0;
    opOne = null;
    opTwo = 0;
    prevOpTwo = 0;
    operator = null;
    prevResult = null;
    length = 0;
    comp = 0;
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
    comp = 0;
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
    comp = 0;
    error();
    if (result.innerText.includes(".") && result.innerText.length > 5) {
        result.innerText = parseFloat(result.innerText).toFixed(3);
        error();
    }    
});

buttons.forEach(function (button) {
    if (button.id.startsWith("button")) {
        button.addEventListener("click", () => {
            number(button.innerText);
        });
    }
});