const MAX = 19;
const MIN = 0;
let tbody = document.querySelector('tbody');
let length = 0;
let tail = 9;
let head = 9;
let interval;
let count = 0;
let xFood = 0;
let yFood = 0;
let snakeTail;
let isModA = true;
//Keycode : 37 Left 
//Keycode : 38 Up 
//Keycode : 39 Right 
//Keycode : 40 Bottom
function renderMatrix() {
    let templateStr = ``;
    for (let i = 0; i < 20; i++) {
        templateStr += `<tr>`
        for (let j = 0; j < 20; j++) {
            templateStr += `
                 <td data-row=${j} data-col=${i}></td>
            `
        }
        templateStr += `</tr>`
    }
    tbody.innerHTML = templateStr;
}

renderMatrix();

function renderRandomFood() {
    let tdTag = tbody.querySelector(`[data-row='${xFood}'][data-col='${yFood}']`);
    tdTag.classList.remove('food');
    xFood = Math.round(Math.random() * (MAX - MIN) + MIN);
    yFood = Math.round(Math.random() * (MAX - MIN) + MIN);
    tdTag = tbody.querySelector(`[data-row='${xFood}'][data-col='${yFood}']`);
    tdTag.classList.add('food');
}
renderRandomFood();
function snakeMove(keyCode = 39) {
    clearInterval(interval);
    let tdTag = tbody.querySelector(`[data-row='${head}'][data-col='${tail}']`);
    tdTag.classList.add('active');
    interval = setInterval(() => {
        switch (keyCode) {
            case 37:
                handleArrowRight(false);
                break;
            case 38:
                handleArrowUp();
                break;
            case 39:
                handleArrowRight();
                break;
            case 40:
                handleArrowUp(false);
                break;
            default:
                break;
        }


    }, 200)
}
function handleArrowRight(isRight = true) {
    console.log(head)
    if (head < 0 || head > 18) {
        isModA ? handleModA() : handleModB();
        return;
    }
    snakeTail = isRight ? head++ - length : head-- + length;
    let tdTag = tbody.querySelector(`[data-row='${snakeTail}'][data-col='${tail}']`);
    tdTag.classList.remove('active');
    tdTag = tbody.querySelector(`[data-row='${head}'][data-col='${tail}']`);
    tdTag.classList.add('active');
    if ((head === xFood && tail === yFood) || (head === yFood && tail === xFood)) {
        renderRandomFood();
        length++;
    }
}
function handleArrowUp(isUp = true) {
    if (tail < 0 || tail > 19) {
        isModA ? handleModA() : handleModB();
        return;
    }
    snakeTail = isUp ? tail-- + length : tail++ - length;
    let tdTag = tbody.querySelector(`[data-row='${head}'][data-col='${snakeTail}']`);
    tdTag.classList.remove('active');
    tdTag = tbody.querySelector(`[data-row='${head}'][data-col='${tail}']`);
    tdTag.classList.add('active');
    if ((head === xFood && tail === yFood) || (head === yFood && tail === xFood)) {
        renderRandomFood();
        length++;
    }
}
function handleKeyUp(e) {
    if (e.keyCode !== 37 && e.keyCode !== 38 && e.keyCode !== 39 && e.keyCode !== 40) return;
    count = 0;
    snakeMove(e.keyCode);
    console.log(e.keyCode);
}
function handleModA() {
    clearInterval(interval);
    document.querySelector('.status').textContent = 'You lose';
    return;
}
function handleModB(keyCode) {
    // switch (keyCode) {
    //     case 37:

    //         break;
    //     case 38:
    //         break;
    //     case 39:
    //         break;
    //     case 40:
    //         break;
    //     default:
    //         break;
    // }
}
snakeMove()
window.addEventListener('keyup', handleKeyUp)
document.querySelector('.modA').addEventListener('click', () => isModA = true)
document.querySelector('.modB').addEventListener('click', () => isModA = false)