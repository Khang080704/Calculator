var btnElements = document.querySelectorAll("button");
var screen = document.querySelector(".input");
var historyElement = document.querySelector(".history");
console.log(historyElement);

var textInput = "";
var steps = ["0"];
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
                    var result = calculate(steps);
                    console.log(result);
                    steps = [];
                    steps.push(result);
                    steps.push(value);
                    screen.innerText = result;
                    historyElement.innerText = screen.innerText.toString() + value.toString();
                }
            } else {
                if (value !== "=") {
                    if (operators.includes(steps[lastIndex])) {
                        screen.innerText = "";
                        textInput = value;
                        steps.push(value);
                        screen.innerText += textInput;
                    } else {
                        steps.push(value);
                        screen.innerText = textInput;
                        screen.innerText += value;
                        textInput += value;
                    }
                } else {
                    var result = calculate(steps);
                    if (result == "Error, cannot divide by zero") {
                        screen.innerText = result;
                        clear();
                    } else {
                        steps = [result];
                        historyElement.innerText = "";
                        screen.innerText = result;
                    }
                }
            }
        }
    });
});

function clear() {
    steps = ["0"];
    textInput = "";
    historyElement.innerText = "";
}

function calculate(steps) {
    var operands = [];
    var temp = "";
    var operator = "";
    steps.forEach((step) => {
        if (operators.includes(step)) {
            operator = step;
            operands.push(temp);
            temp = "";
        } else {
            temp += step;
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
