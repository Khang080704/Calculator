var btnElements = document.querySelectorAll("button");
var screen = document.querySelector(".input");
var historyElement = document.querySelector(".history");
console.log(historyElement);

var textInput = "";
var steps = [];
var operators = ["+", "-", "x", "/", "%"];

btnElements.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        var lastIndex = steps.length - 1;
        if (value === "C") {
            steps.push(value);
            screen.innerText = "0";
            historyElement.innerText = "";
            textInput = "";
            steps = ["0"];
        } else {
            if (operators.includes(value)) {
                if (operators.includes(steps[lastIndex])) {
                    steps[lastIndex] = value;
                    historyElement.innerText = screen.innerText.toString() + steps[lastIndex];
                } else {
                    if (steps[lastIndex] == "=") {
                        steps.splice(lastIndex, 1);
                        historyElement.innerText = screen.innerText.toString() + value;
                        steps.push(value);
                        screen.innerText = steps[0];
                    } else {
                        var result = calculate(steps);
                        steps = [];
                        steps.push(result);
                        steps.push(value);
                        screen.innerText = result;
                        historyElement.innerText = screen.innerText.toString() + value.toString();
                    }
                }
            } else {
                if (value !== "=") {
                    if (steps[lastIndex] == "=") {
                        steps.splice(lastIndex, 1);
                        screen.innerText = "";
                        historyElement.innerText = "";
                        steps = [];
                        steps.push(value);
                        textInput += value
                        screen.innerText = textInput;
                    } else {
                        if (operators.includes(steps[lastIndex])) {
                            screen.innerText = "";
                            textInput = value;
                            steps.push(value);
                            screen.innerText += textInput;
                        } else {
                            if (value == "0") {
                                if (findDifferentZero(steps)) {
                                    console.log(steps);
                                    steps.push(value);
                                    screen.innerText = textInput;
                                    screen.innerText += value;
                                    textInput += value;
                                } else {
                                    //do nothing
                                }
                            } else {
                                steps.push(value);
                                textInput += value;
                                screen.innerText = textInput;
                            }
                        }
                    }
                } else {
                    var result = calculate(steps);
                    // if(!checkOperator(steps, operators)) { //neu khong ton tai toan tu nao
                    //     result =
                    // }
                    if (result == "Error, cannot divide by zero") {
                        screen.innerText = result;
                        clear();
                    } else {
                        steps = [result];
                        console.log(steps);
                        historyElement.innerText = "";
                        screen.innerText = result;
                        textInput = "";
                    }
                    steps.push(value);
                }
            }
        }
    });
});

function findDifferentZero(steps) {
    for (let i = 0; i < steps.length; i++) {
        if (steps[i] !== "0") {
            return true;
        }
    }
    return false;
}

function checkOperator(steps, operators) {
    steps.some((step) => {
        return operators.includes(step);
    });
}

function clear() {
    steps = [];
    textInput = "";
    historyElement.innerText = "";
}

function calculate(steps) {
    var operands = [];
    var temp = "";
    var operator = "";
    steps.forEach((step) => {
        console.log(typeof step);
        if (operators.includes(step)) {
            operator = step;
            operands.push(temp);
            temp = "";
        } else {
            if (step != "=") {
                temp += step.toString();
            }
        }
    });
    operands.push(temp);
    if (operator == "") {
        return Number(temp);
    }

    switch (operator) {
        case "+":
            return parseFloat(operands[0]) + parseFloat(operands[1]);
        case "-":
            return parseFloat(operands[0]) - parseFloat(operands[1]);
        case "x":
            return parseFloat(operands[0]) * parseFloat(operands[1]);
        case "%":
            return parseFloat(operands[0]) % parseFloat(operands[1]);
        case "/":
            try {
                if (Number(operands[1]) == 0) {
                    throw "Error, cannot divide by zero";
                }
                var result = Number(operands[0]) / Number(operands[1]);
                return result;
            } catch (err) {
                return err;
            }

        default:
            break;
    }
}
