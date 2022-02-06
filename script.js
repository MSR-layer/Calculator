const operandList = [
    '+',
    '÷',
    '-',
    '×'
];

const screen = document.querySelector('#equation');
const resultScreen = document.querySelector('#result');
let operation = '';

function displayCurrentNumber(){
    resultScreen.textContent = '';
    
    let obj = operation.split(' ');
    if(obj[2])
        resultScreen.textContent = obj[2];
    else
        resultScreen.textContent = obj[0];
    

}

function updateScreen(){
    screen.textContent = operation;
}

function displayContent(){ 
    
    operation += `${this.textContent}`;
    displayCurrentNumber();
    
}

function clearScreen(){
    hasDP = 0;
    hasOperand = 0; 
    screen.textContent = '';
    resultScreen.textContent = '';
    operation = '';
}

function deleteChar(){
    if(screen.textContent.endsWith('.')) hasDP = 0;
    else if(operandList.some(o => screen.textContent.endsWith(o))) hasOperand = 0;
    result.textContent = result.textContent.slice(0, -1);
    operation = operation.slice(0, -1);
}

let hasDP = 0;
function addDecimalPoint(){
    
    if(!hasDP)
        operation += '.';
    
    displayCurrentNumber();

}

hasOperand = 0;
function addOperand(){

    resultScreen.textContent = '';

    if(!hasOperand){
        hasOperand = 1;
        hasDP = 0;
        operation += ` ${this.textContent} `;
    }else if(hasOperand && operandList.some(o => operation.endsWith(` ${o} `))){
        operation = operation.slice(0, -3);
        operation += ` ${this.textContent} `;
    }else if(hasOperand){
        evaluate();
        operation += ` ${this.textContent} `;
    }

    updateScreen();
    displayCurrentNumber();
}

function evaluate(){
    console.log(operation);
    const obj = operation.split(' ');
    console.log(obj);

    if(!obj[2]) return;

    a = parseFloat(obj[0]);
    b = parseFloat(obj[2]);

    let result;
    if(obj[1] === '+') 
        result = (a + b);
    if(obj[1] === '-')
        result = (a - b);
    if(obj[1] === '×')
        result = (a * b);
    if(obj[1] === '÷'){
        if(b === 0) {
            resultScreen.textContent = 'why would you do that lmao';
            return;
        }
        result = (a / b);
    }
    console.log(result);

    operation += ' =';
    screen.textContent = operation;
    resultScreen.textContent = result;
    // displayCurrentNumber();
    // updateScreen();

    operation = '';
    operation += result; 
    //
}

function equalEvaluate(){
    evaluate();
    hasOperand = 0;
}

const numButtons = Array.from(document.querySelectorAll('#calc-buttons .num.input'));
const operandButtons = Array.from(document.querySelectorAll('#calc-buttons .operand.input'));
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const decimalButton = document.querySelector('#dp');
const equalButton = document.querySelector('#equal');

clearScreen();

numButtons.forEach(key => key.addEventListener('click', displayContent));

operandButtons.forEach(key => key.addEventListener('click', addOperand));

clearButton.addEventListener('click', clearScreen);

deleteButton.addEventListener('click', deleteChar);

decimalButton.addEventListener('click', addDecimalPoint);

equalButton.addEventListener('click', equalEvaluate);
