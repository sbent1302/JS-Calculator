// equation.js
const history = [];
var historyLength = 10;
var equation = '';
var fstNo = '';
var factor = '';
var going = false;

// Initialize
clearall();
document.getElementById("display").innerText = "⠀⠀⠀⠀⠀⠀⠀⠀⠀";

// Main calculator functions
function go(){
    var num1 = parseInt(document.getElementById("number1").value);
    var num2 = parseInt(document.getElementById("number2").value);
    var type = document.getElementById("type").value;
    console.log(type);
    console.log("Number 1: " + num1 + " Number 2:" + num2);
    input(num1,type,num2);
}


function inputButtonPress(button){
    equation += button;
    if(factor == ""){
        fstNo = equation;
    }
    console.log("Equation = " + equation);
    console.log("Button = " + button);
    //document.getElementById("display").innerHTML = document.getElementById("display").innerText + equation;
    document.getElementById("display").innerHTML = document.getElementById("display").innerText + button;
}

function middle(factor2) {
    fstNo = equation;
    factor = factor2;
    equation = '';
    console.log("fstNo = " + fstNo);
    console.log("Factor = " + factor);
    document.getElementById("display").innerHTML = fstNo + convertOperator(factor);
}

function clearall() {
    equation = '';
    factor = '';
    fstNo = '';
    //document.getElementById("display").innerText = "⠀⠀⠀⠀⠀⠀⠀⠀⠀"
}


function buttonGo() {
    going = true;
    input(fstNo, factor, equation, "button");
    clearall();
}

function input(number1, type, number2, outputType){
    switch (type) {
        case "plus":
            var output = Number(number1) + Number(number2)
            break;
        case "minus":
            var output = Number(number1) - Number(number2)
            break;
        case "multiply":
            var output = Number(number1) * Number(number2)
            break;
        case "divide":
            var output = Number(number1) / Number(number2)
            break;
        default:
            var output = "Please select a type."
            break;
    }
    if (outputType == "button") {
      console.log(output);
      var buttony = Number(number1) + convertOperator(factor) + Number(number2) + "=" + output;
      document.getElementById("display").innerHTML = buttony;
      going = false;
    } else {
      document.getElementById("display").innerHTML = "The answer is: " + output;  
    }
    
    //Store in history array. Only the last {historyLength} (5 or 10) equations are stored.
    history.push({number1: number1, type: type, number2: number2, output: output});
    if (history.length > historyLength) {
        history.splice(0, 1);
    }
    console.log(history);
    displayHistoryFunction();
};
function displayHistoryFunction(){
    // Display history
    displayHistory = JSON.stringify(history);
    displayHistory = JSON.parse(displayHistory);
    displayH = "";
    for (let i = displayHistory.length - 1; i >= 0; i--) {
        displayH += `${displayHistory[i].number1}${convertOperator(displayHistory[i].type)}${displayHistory[i].number2}=${displayHistory[i].output}<br>`;
    }

    document.getElementById("history").innerHTML = displayH;
}
  //setCookie("history", displayH, 365);

function convertOperator(type){
    switch(type){
        case "plus":
            return "+";
        case "minus":
            return "-";
        case "multiply":
            return "*";
        case "divide":
            return "/";
        default:
            return "";
    }
}

function historyLengthSet(){
    if (historyLength == 10) {
        historyLength = 5;
        document.getElementById("hisLng").innerHTML = "Set history to 10";
        if (history.length > 5) {
            let deleteCount = history.length - 5;
            history.splice(0, deleteCount);
        }
        displayHistoryFunction();
    } else {
        historyLength = 10;
        document.getElementById("hisLng").innerHTML = "Set history to 5";
    }
}

function clearHistory(){
    history.length = 0;
    document.getElementById("history").innerHTML = "";
}
