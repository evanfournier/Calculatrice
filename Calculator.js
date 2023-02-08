//9x6-33x0.5+0.5 = 20
//Fonction calculateCalculation

var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var signs = ["x", "/", "+", "-", "^"];

var zero = document.getElementById("zero");
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");
var six = document.getElementById("six");
var seven = document.getElementById("seven");
var eight = document.getElementById("eight");
var nine = document.getElementById("nine");
var comma = document.getElementById("comma");

var addition = document.getElementById("addition");
var substraction = document.getElementById("substraction");
var multiplication = document.getElementById("multiplication");
var division = document.getElementById("division");
var power = document.getElementById("power");

var clearError = document.getElementById("clearError");
var clear = document.getElementById("clear");
var del = document.getElementById("delete")
var equal = document.getElementById("equal");

var label = document.getElementById("calculation");
var result = document.getElementById("result");
var error = document.getElementById("error");

function separateCalculation () {
    var calculation = [];
    var number = "";
    for (var char of label.innerHTML) {
        if ((signs+["(", ")"]).includes(char)) {
            if (number != "") {
                calculation.push(Number(number));
                number = "";
            };
            calculation.push(char);
        };
        if ((digits+["."]).includes(char)) {
            number += char;
        };
    };
    if (number != "") {
        calculation.push(Number(number));
    };
    return calculation;
};

function calculateCalculation (calculation) {
    if (["+", "-"].includes(calculation[0])) {
        calculation[1] = (calculation[0] == "-") ? calculation[1]*(-1) : calculation[1];
        calculation.shift();
    };
    for (var list of [["^"], ["x", "/"], ["+", "-"]]) {
        if (calculation == "Division by zero is impossible") {
            break;
        };
        while (calculation.includes(list[0]) || calculation.includes(list[list.length-1])) {
            if (calculation == "Division by zero is impossible") {
                break;
            };
            for (var [i, element] of calculation.entries()) {
                if (list.includes(element)) {
                    switch (element) {
                        case "+":
                            calculation[i-1] = calculation[i-1]+calculation[i+1];
                            calculation.splice(i, i+1);
                            console.log(calculation);
                        break;
                        
                        case "-":
                            calculation[i-1] = calculation[i-1]-calculation[i+1];
                            calculation.splice(i, i+1);
                            console.log(calculation);
                        break;

                        case "x":
                            calculation[i-1] = calculation[i-1]*calculation[i+1];
                            calculation.splice(i, i+1);
                            console.log(calculation);
                        break;

                        case "/":
                            if (calculation[i+1] != 0) {
                                calculation[i-1] = calculation[i-1]/calculation[i+1];
                                calculation.splice(i, i+1);
                                console.log(calculation);
                            } else {
                                calculation = "Division by zero is impossible";
                                break;
                            };
                        break;

                        case "^":
                            calculation[i-1] = calculation[i-1]**calculation[i+1]; 
                            calculation.splice(i, i+1);
                            console.log(calculation);
                        break;
                    };
                };
            };
        };
    };
    return (calculation == "Division by zero is impossible") ? calculation : calculation[0];
};

function calculate () {
    var calculation = separateCalculation();
    if (["+", "-"].includes(calculation[calculation.length-1])) {
        calculation.push(0);
    } else if (["x", "/", "^"].includes(calculation[calculation.length-1])) {
        calculation.push(1);
    };
    if (label.innerHTML != "") {
        console.log(calculation);
        var calculation = calculateCalculation(calculation);
        return calculation;
    };
};

function display (string, list) {
    if ((label.innerHTML == "" && list[0] == ",") || list.includes(label.innerHTML[label.innerHTML.length-1])) {
        label.innerHTML += string;
        result.innerHTML = String(calculate());
    };

};

function displayDigit (digit) {
    console.log("chiffre");
    display(digit, ["", ".", "(", "√"]+digits+signs);
};

function displaySign (sign) {
    if (result.innerHTML != "Division by zero is impossible") {
        if (label.innerHTML != "") {
            if ((digits+["π", ")", "!"]).includes(label.innerHTML[label.innerHTML.length-1])) {
                console.log("chiffres")
                label.innerHTML += sign;
                result.innerHTML = String(calculate());
            } else if (signs.includes(label.innerHTML[label.innerHTML.length-1]) && label.length < 1) {
                console.log("signes")
                label.innerHTML = label.innerHTML.substring(0, label.innerHTML.length-2)+sign;
                result.innerHTML = String(calculate());
            };
        } else if (["+", "-"].includes(sign)) {
            console.log("signes au départ")
            label.innerHTML = sign;
            result.innerHTML = String(calculate());
        };
    };
};

zero.addEventListener("click", function (e) {
    e.preventDefault()
    displayDigit("0");
});
one.addEventListener("click", function (e) {
    e.preventDefault();
    displayDigit("1");
});
two.addEventListener("click", function (e) {
    e.preventDefault();
    displayDigit("2");
});
three.addEventListener("click", function (e) {
    e.preventDefault();
    displayDigit("3");
});
four.addEventListener("click", function (e) {
    e.preventDefault();
    displayDigit("4");
});
five.addEventListener("click", function (e) {
    e.preventDefault();
    displayDigit("5");
});
six.addEventListener("click", function (e) {
    e.preventDefault();
    displayDigit("6");
});
seven.addEventListener("click", function (e) {
    e.preventDefault();
    displayDigit("7");
});
eight.addEventListener("click", function (e) {
    e.preventDefault();
    displayDigit("8");
});
nine.addEventListener("click", function (e) {
    e.preventDefault();
    displayDigit("9");
});
comma.addEventListener("click", function (e) {
    e.preventDefault();
    if (label.innerHTML != "" && digits.includes(label.innerHTML[label.innerHTML.length-1])) {
        var isThereComma = false;
        for (var char of label.innerHTML) {
            isThereComma += (char == ".");
            if (signs.includes(char)) {
                isThereComma = false;
            };
        };
        if (!isThereComma) {
            label.innerHTML += ".";
            result.innerHTML = String(calculate());
        };
    };
});

addition.addEventListener("click", function (e) {
    e.preventDefault();
    displaySign("+");
});
substraction.addEventListener("click", function (e) {
    e.preventDefault();
    displaySign("-");
});
multiplication.addEventListener("click", function (e) {
    e.preventDefault();
    displaySign("x");
});
division.addEventListener("click", function (e) {
    e.preventDefault();
    displaySign("/");
});
power.addEventListener("click", function (e) {
    e.preventDefault();
    displaySign("^");
});
clearError.addEventListener("click", function (e) {
    e.preventDefault();
    if (label.innerHTML != "") {
        var calculation = separateCalculation();
        console.log(calculation);
        calculation.pop();
        label.innerHTML = calculation.join("");
        if (label.innerHTML != "") {
            result.innerHTML = String(calculate());
        } else {
            result.innerHTML =  "";
        };
    };
});
clear.addEventListener("click", function (e) {
    e.preventDefault();
    label.innerHTML = "";
    result.innerHTML = "";
});
del.addEventListener("click", function (e) {
    e.preventDefault();
    if (label.innerHTML != "") {
        label.innerHTML = label.innerHTML.substring(0, label.innerHTML.length-1);
        if (label.innerHTML != "") {
            result.innerHTML = String(calculate());
        } else {
            result.innerHTML = "";
        };
    };
});
equal.addEventListener("click", function (e) {
    e.preventDefault();
    if (result.innerHTML != "Division by zero is impossible") {
        label.innerHTML = result.innerHTML;
        result.innerHTML = "";
    } else {
        label.innerHTML = "";
        result.innerHTML = "";
    };
});

label.innerHTML = "";
result.innerHTML = "";