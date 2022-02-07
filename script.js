let audio = new Audio("audio.mp3");
audio.load();
audio.currentTime = 0.5;

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

function displayContent(e){ 
    if(!e.key){
        operation += `${this.textContent}`;
        displayCurrentNumber();
        return;
    }

    operation += `${e.key}`;
    displayCurrentNumber();
    
}

function clearScreen(){
    resultScreen.style.fontSize = '50px';
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
    
    if(!hasDP){
        operation += '.';
        hasDP = 1;
    }
    
    displayCurrentNumber();

}

hasOperand = 0;
function addOperand(e){

    if(operation==='') operation += '0';

    if(e.key)
    {
        
        resultScreen.textContent = '';
        let operand = e.key;
        if(e.key === '/') operand = '÷';
        if(e.key === '*') operand = '×';
        if(!hasOperand){
            hasOperand = 1;
            hasDP = 0;
            operation += ` ${operand} `;
        }else if(hasOperand && operandList.some(o => operation.endsWith(` ${o} `))){
            operation = operation.slice(0, -3);
            operation += ` ${operand} `;
        }else if(hasOperand){
            evaluate();
            operation += ` ${operand} `;
        }
        updateScreen();
        displayCurrentNumber();
        return;
    }

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
            //document.getElementById('bruh').play();
            audio.play();
            resultScreen.textContent = 'Bruh';
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

function onClick(){
    this.classList.add('clicked');
}

const numButtons = Array.from(document.querySelectorAll('#calc-buttons .num.input'));
const operandButtons = Array.from(document.querySelectorAll('#calc-buttons .operand.input'));
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const decimalButton = document.querySelector('#dp');
const equalButton = document.querySelector('#equal');

const allButtons = Array.from(document.querySelectorAll('button'));

allButtons.forEach(key => key.addEventListener('click', onClick));

clearScreen();

numButtons.forEach(key => key.addEventListener('click', displayContent));

operandButtons.forEach(key => key.addEventListener('click', addOperand));

clearButton.addEventListener('click', clearScreen);

deleteButton.addEventListener('click', deleteChar);

decimalButton.addEventListener('click', addDecimalPoint);

equalButton.addEventListener('click', equalEvaluate);

document.addEventListener('keydown',e => keyboardSupport(e));

function keyboardSupport(e){
    console.log(operation);
    const obj = operation.split(' ');
    //console.log(obj);

    if(e.key === 'Enter' && obj[2]){
        equalEvaluate();
    }else if (e.key === '.')
    {
        addDecimalPoint();
    }else if (e.key >= 0 && e.key <= 9){
        displayContent(e);
    }else if(operandList.some(o => e.key === `${o}`)){
        addOperand(e);
    }else if(e.key === 'd'){
        clearScreen();
    }else if(e.key === 'Backspace'){
        deleteChar();
    }

    console.log(obj);
   
    
}

function operate(){
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
}
