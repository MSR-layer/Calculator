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

    operation = '';
    operation += result; 
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

document.addEventListener('keydown',e => keyboardSupport(e));

function keyboardSupport(e){
    /***
     * 1 => 97, 49
     * 2 => 98, 50
     * 9 => 105, 57
     * 0 => 96, 48
     * 
     * . => 190
     * 
     * / => 111
     * * => 106
     * - => 109
     * + => 107
     * ent => 13
     * 
     * 
    */
   console.log(e);
    if(e.key === '0') operation += 0;
    if(e.key === '1') operation += 1;
    if(e.key === '2') operation += 2;
    if(e.key === '3')  operation += 3;
    if(e.key === '4') operation += 4;
    if(e.key === '5') operation += 5;
    if(e.key === '6') operation += 6;
    if(e.key === '7') operation += 7;
    if(e.key === '8') operation += 8;
    if(e.key === '9') operation += 9;
    if(e.key === '+') operation += e.key;
    if(e.key === '-') operation += e.key;
    if(e.key === '*') operation += e.key;
    if(e.key === '/') operation += e.key;

    displayCurrentNumber();
    updateScreen();
    
}