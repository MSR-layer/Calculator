
function displayContent(){
    const screen = document.querySelector('#calc-screen');
    screen.textContent += this.textContent;
}

function clearScreen(){
    hasDP = 0;
    const screen = document.querySelector('#calc-screen');
    screen.textContent = '';
}

function deleteChar(){
    const screen = document.querySelector('#calc-screen');
    if(screen.textContent.endsWith('.')) hasDP = 0;
    screen.textContent = screen.textContent.slice(0, -1);
}

let hasDP = 0;
function addDecimalPoint(){
    const screen = document.querySelector('#calc-screen');
    if(!hasDP){
        hasDP = 1;
        screen.textContent += '.'; 
    }

}
const numButtons = Array.from(document.querySelectorAll('#calc-buttons .num.input'));
const operandButtons = Array.from(document.querySelectorAll('#calc-buttons .operand.input'));
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const decimalButton = document.querySelector('#dp');

numButtons.forEach(key => key.addEventListener('click', displayContent));

operandButtons.forEach(key => key.addEventListener('click', displayContent));

clearButton.addEventListener('click', clearScreen);

deleteButton.addEventListener('click', deleteChar);

decimalButton.addEventListener('click', addDecimalPoint);