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
    resultScreen.textContent = obj[2];
}

function displayContent(){ 
    //88 + 14
    operation += `${this.textContent}`;
    if(hasOperand){
        //resultScreen.textContent = '';
        //resultScreen.textContent += `${this.textContent}`;
        displayCurrentNumber();
    }else
    {
        screen.textContent = operation;
        resultScreen.textContent += `${this.textContent}`;
    }
    
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
    //screen.textContent = screen.textContent.slice(0, -2);
    result.textContent = result.textContent.slice(0, -1);
    operation = operation.slice(0, -1);
}

let hasDP = 0;
function addDecimalPoint(){
    if(!hasDP && !operandList.some(o => screen.textContent.endsWith(o))){
        hasDP = 1;
        screen.textContent += '.'; 
    }

}

hasOperand = 0;
function addOperand(){

    if(!hasOperand /*&& !screen.textContent.endsWith('.')*/){
        hasOperand = 1;
        hasDP = 0;
        operation += ` ${this.textContent} `;
        screen.textContent = operation; 
    }else if(hasOperand && operandList.some(o => screen.textContent.endsWith(o))){
        screen.textContent = screen.textContent.slice(0, -2);
        screen.textContent += ` ${this.textContent} `;
    }
    
}

function evaluate(){
    console.log(operation);
    const obj = operation.split(' ');
    console.log(obj);

    a = parseFloat(obj[0]);
    b = parseFloat(obj[2]);

    let result;
    if(obj[1] === '+') 
        result = (a + b);
    if(obj[1] === '-')
        result = (a - b);
    if(obj[1] === '×')
        result = (a * b);
    if(obj[1] === '÷')
        result = (a / b);
    
    console.log(result);

    operation += ' =';
    screen.textContent = operation;
    resultScreen.textContent = result;
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

equalButton.addEventListener('click', evaluate);
