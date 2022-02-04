const operandList = [
    '+',
    '÷',
    '-',
    '×'
];

const screen = document.querySelector('#equation');

function displayContent(){ 
    if(screen.textContent.endsWith('.')) 
        screen.textContent += `${this.textContent}`;
    else
        screen.textContent += ` ${this.textContent}`;
}

function clearScreen(){
    hasDP = 0;
    hasOperand = 0; 
    screen.textContent = '';
}

function deleteChar(){
    
    if(screen.textContent.endsWith('.')) hasDP = 0;
    else if(operandList.some(o => screen.textContent.endsWith(o))) hasOperand = 0;
    screen.textContent = screen.textContent.slice(0, -2);
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
        screen.textContent += ` ${this.textContent}`; 
    }else if(hasOperand && operandList.some(o => screen.textContent.endsWith(o))){
        screen.textContent = screen.textContent.slice(0, -2);
        screen.textContent += ` ${this.textContent}`
    }
}

function evaluate(){
    const str = screen.textContent;
    console.log(str);
    const obj = str.split(' ');
    obj.shift();
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

    document.querySelector('#result').textContent = result;
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
