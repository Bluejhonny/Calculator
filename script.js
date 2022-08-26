var input = document.getElementById('input'), //input/output button
    number = document.querySelectorAll('.numbers div'), //number buttons
    operator = document.querySelectorAll('.operators div'), //operator button
    result = document.getElementById('result'), // equal button
    clear = document.getElementById('clear'), //clear button
    //resultDisplayed = false;
    resultDisplayed = '0';

for (var i=0; i < number.length; i++) {
    number[i].addEventListener('click', function(e){
        // storing current input string and its last character in variables, to use later
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];
        // if result is not displayed keep adding new string 
        if (resultDisplayed === false){
            input.innerHTML += e.target.innerHTML;
        } else if ( resultDisplayed === true && lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '÷'){
            //keep on adding the strings to the next operation
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else { 
            //if previous result is currently displayed and user pressed a new number
            //we need to clear the input string and add the new input to star the new operation
            resultDisplayed = false;
            input.innerHTML='';
            input.innerHTML += e.target.innerHTML;
        }
    });
}

//adding click handlers to number buttons
for (var i=0; i < operator.length; i++) {
    operator[i].addEventListener('click', function(e){
        //storing current input string and its last character in variables
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];
        //if last character entered is an operator, replace it with the currently pressed one
        if (lastChar==='+' || lastChar === '-' || lastChar === 'x' || lastChar === '÷') {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;

            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            //if first key pressed is an operator, don't do anything
            console.log('enter a number first'); 
        } else {
            //else just add the operator pressed to the input
            input.innerHTML += e.target.innerHTML;
        }
    })
}

result.addEventListener('click', function() {
    var inputString = input.innerHTML;
    var numbers = inputString.split(/\+|\-|\x|\÷/g);
    var operators = inputString.replace(/[0-9]|\./g,"").split("");
    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("-----------------------------");
    // now we are looping through the array and doing one operation at a time.  
    // first divide, then multiply, then subtraction and then addition  
    // as we move we are alterning the original numbers and operators array  
    // the final element remaining in the array will be the output  
    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);  
        operators.splice(divide, 1);  
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf('x');
    console.log("error " + multiply)  
    while (multiply != -1) {  
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);  
        operators.splice(multiply, 1);  
        multiply = operators.indexOf('x');  
    }  
    var subtract = operators.indexOf("-");  
    while (subtract != -1) {  
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);  
        operators.splice(subtract, 1);  
        subtract = operators.indexOf("-");  
    }  
    var add = operators.indexOf("+");  
    while (add != -1) {  
   // using parseFloat is necessary, otherwise it will result in string concatenation :)  
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));  
        operators.splice(add, 1);  
        add = operators.indexOf("+");  
    }  
    input.innerHTML = numbers[0]; // displaying the output  
    resultDisplayed = true; // turning flag if result is displayed  
});  

// clearing the input on press of clear  
clear.addEventListener("click", function() {  
  input.innerHTML = "";  
})  