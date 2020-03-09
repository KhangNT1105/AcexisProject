let tbodyTag = document.querySelector('tbody');
let formTag = document.querySelector('form');
let resetButton = document.querySelector('.reset');
let winnerTag = document.querySelector('.winner');
let consecutiveCells = 3;
let arr = [];
let isX;
let xWin;
let yWin;
function setAll(length) {
    arr = [];
    let newArr;
    for (let i = 0; i < length; i++) {
        newArr = [];
        for (let j = 0; j < length; j++) {
            newArr.push(0);
        }
        arr.push(newArr);
    }
}

function renderTable(col = 3) {
    isX = true;
    xWin = false;
    yWin = false;
    let templateStr = ``;
    for (let i = 0; i < col; i++) {
        templateStr += `<tr>`
        for (let j = 0; j < col; j++) {
            templateStr += `<td  data-col=${i} data-row=${j}></td>`
        }
        templateStr += `</tr>`
    }
    setAll(col);
    tbodyTag.innerHTML = templateStr;
}
renderTable();
function handleSubmit(e) {
    let quantityColRow = parseInt(formTag.querySelector('.quantityColRow').value);
    consecutiveCells = parseInt(formTag.querySelector('.consecutiveCells').value);
    console.log(quantityColRow, consecutiveCells);
    renderTable(quantityColRow);
    console.log(arr);
    formTag.reset();

    e.preventDefault();
}
function checkWinnerRow(newArr, consecutiveCells) {

    for (let i = 0; i < newArr.length; i++) {
      
        let xCount = 0;
        let yCount = 0;
        for (let j = 0; j < newArr.length; j++) {
            if (newArr[i][j] === 1) {
                xCount++;
            }
            if (newArr[i][j] === 2) {
                yCount++;
            }
            console.log(xCount, yCount);
            if (xCount === consecutiveCells || yCount === consecutiveCells) {
                winnerTag.textContent = `${xCount === consecutiveCells ? 'X' : 'O'} is winner`;
                tbodyTag.style.pointerEvents = 'none';
                return;
            }
        }

    }
}
function checkWinner(arr, consecutiveCells) {
    //Kiểm tra 1 hàng có full X  hay Y hay ko
    checkWinnerRow(arr, consecutiveCells);
    //Swap row =>col
    //    1,2,0            1,1,1
    //    1,2,0     =>     2,2,0  
    //    1,0,0            0,0,0
    let newArr = arr.map((row, rowIndex) => arr.map(val => val[rowIndex]))
    console.log(newArr);
    checkWinnerRow(newArr, consecutiveCells);
    //Check đường chéo chính & phụ
    checkWinnerDiagonal(arr, consecutiveCells);

}
function checkWinnerDiagonal(arr, consecutiveCells) {
    let xCount = 0;
    let yCount = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][i] === 1 || arr[i][arr.length - i - 1] === 1) {
            xCount++;
        }
        if (arr[i][i] === 2 || arr[i][arr.length - i - 1] === 2) {
            yCount++;
        }
    }
    if (xCount === consecutiveCells || yCount === consecutiveCells) {
        winnerTag.textContent = `${xCount === consecutiveCells ? 'X' : 'O'} is winner`;
        tbodyTag.style.pointerEvents = 'none';
        return;
    }
}
//Click vào sẽ check X hoặc Y
function check(e) {
    let col = parseInt(e.target.dataset.col);
    let row = parseInt(e.target.dataset.row);
    if (arr[col][row] !== 0) return;
    if (isX) {
        e.target.textContent = 'X';
        arr[col][row] = 1;

    } else {
        e.target.textContent = 'O';
        arr[col][row] = 2;
    }
    isX = !isX;
    checkWinner(arr, consecutiveCells);
}
function handleReset() {
    renderTable(3);
}
formTag.addEventListener('submit', handleSubmit);
tbodyTag.addEventListener('click', check);
resetButton.addEventListener('click', handleReset)