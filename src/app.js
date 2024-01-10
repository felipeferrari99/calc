const buttons = document.querySelectorAll("button")
const buttonZero = document.querySelector("#buttonZero");
const buttonOne = document.querySelector("#buttonOne");
const buttonTwo = document.querySelector("#buttonTwo");
const buttonThree = document.querySelector("#buttonThree");
const buttonFour = document.querySelector("#buttonFour");
const buttonFive = document.querySelector("#buttonFive");
const buttonSix = document.querySelector("#buttonSix");
const buttonSeven = document.querySelector("#buttonSeven");
const buttonEight = document.querySelector("#buttonEight");
const buttonNine = document.querySelector("#buttonNine");
const equals = document.querySelector("#equals")
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
let operator = 0;
let prevResult = 0;

function activate(botao) {
    buttons.forEach(function(button) {
        button.classList.remove('await');
    });
    botao.classList.add('await');
}

function number(n) {
    if (result.innerText === "0" || parseFloat(result.innerText) === parseFloat(opOne) || parseFloat(result.innerText) === parseFloat(prevResult) || parseFloat(result.innerText) === (parseFloat(prevResult))*-1) {
        result.innerText = n;
    } else {
        result.innerText += n;
    }
}

function operation(op) {
    if (result.innerText != 0){
        opOne = parseFloat(result.innerText);
    }
    operator = op;
}

decimal.addEventListener("click", () => {
    if (!result.innerText.includes(".")) {
        result.innerText = result.innerText + '.';
    }
})

reset.addEventListener("click", () => {
    result.innerText = 0;
    opOne = 0;
    opTwo = 0;
    operator = 0;
    prevResult = 0;
    buttons.forEach(function(button) {
        button.classList.remove('await');
    });
})

negative.addEventListener("click", () => {
    result.innerText = parseFloat(result.innerText) * (-1);
})

buttonZero.addEventListener("click", () => {
    if (result.innerText != 0) {
        result.innerText = result.innerText + "0";
    }
})

buttonOne.addEventListener("click", () => {
    number(1)
})

buttonTwo.addEventListener("click", () => {
    number(2)
})

buttonThree.addEventListener("click", () => {
    number(3)
})

buttonFour.addEventListener("click", () => {
    number(4)
})

buttonFive.addEventListener("click", () => {
    number(5)
})

buttonSix.addEventListener("click", () => {
    number(6)
})

buttonSeven.addEventListener("click", () => {
    number(7)
})

buttonEight.addEventListener("click", () => {
    number(8)
})

buttonNine.addEventListener("click", () => {
    number(9)
})

equals.addEventListener("click", () => {
    opTwo = parseFloat(result.innerText);
    buttons.forEach(function(button) {
        button.classList.remove('await');
    });
    if (operator == "+"){
        result.innerText = opOne + opTwo;
    } else if (operator == "-"){
        result.innerText = opOne - opTwo;
    } else if (operator == "x"){
        result.innerText = opOne * opTwo;
    } else if (operator == "÷"){
        result.innerText = opOne / opTwo;
    }
    prevResult = result.innerText;
    opOne = 0;
    opTwo = 0;
})

add.addEventListener("click", () => {
    operation(add.innerText);
    activate(add);
})

subtract.addEventListener("click", () => {
    operation(subtract.innerText);
    activate(subtract);
})

multiply.addEventListener("click", () => {
    operation(multiply.innerText);
    activate(multiply);
})

divide.addEventListener("click", () => {
    operation(divide.innerText);
    activate(divide);
})

percent.addEventListener("click", () => {
    operation(percent.innerText);
    result.innerText = opOne / 100;
})