// equation.js
const history = [];
var historyLength = 10;

// Main calculator functions
function go(){
    var num1 = parseInt(document.getElementById("number1").value);
    var num2 = parseInt(document.getElementById("number2").value);
    var type = document.getElementById("type").value;
    console.log(type);
    console.log("Number 1: " + num1 + " Number 2:" + num2);
    input(num1,type,num2);
}

function input(number1, type, number2){
    switch (type) {
        case "plus":
            var output = number1 + number2
            break;
        case "minus":
            var output = number1 - number2
            break;
        case "multiply":
            var output = number1 * number2
            break;
        case "divide":
            var output = number1 / number2
            break;
        default:
            var output = "Please select a type."
            break;
    }

    document.getElementById("display").innerHTML = "The answer is: " + output;
    
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



// Cookie functions
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}