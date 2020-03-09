let formTag = document.querySelector('form');
let arr;
let maxCount = 0;
let count = 0;
let index = 0;
let templateStrBody = ``;
let templateStrHeader = ``;
function createRandomArr(column, row) {
    arr = [];
    let __arr;
    for (let i = 0; i < column; i++) {
        __arr = [];
        for (let j = 0; j < row; j++) {
            __arr.push(Math.round(Math.random() * (1000 - 1) + 1));
        }
        arr.push(__arr);
    }
}
function renderTable(__arr) {

    if (__arr.length > 100) {
        let newArr = __arr.slice(index, index + 100);
        for (let i = 0; i < newArr.length; i++) {
            templateStrBody += `<tr><td>${index + i + 1}</td>`
            for (let j = 0; j < newArr[i].length; j++) {
                templateStrBody += `<td>${newArr[i][j]}</td>`
            }
            templateStrBody += `</tr>`
        }
        document.querySelector('tbody').innerHTML = templateStrBody;
    } else {
        for (let i = 0; i < __arr.length; i++) {
            templateStrBody += `<tr><td>${i + 1}</td>`
            for (let j = 0; j < __arr[i].length; j++) {
                templateStrBody += `<td>${__arr[i][j]}</td>`
            }
            templateStrBody += `</tr>`
        }
        document.querySelector('tbody').innerHTML = templateStrBody;
    }
}
function handleSubmit(e) {
    e.preventDefault();
    templateStrBody=``;
    templateStrHeader=``;
    let column = parseInt(formTag.querySelector('.column').value);
    let row = parseInt(formTag.querySelector('.row').value);
    createRandomArr(column, row);
    maxCount = Math.floor(arr.length / 100);
    templateStrHeader += `<th>STT</th>`
    for (let i = 0; i < arr[0].length; i++) {
        templateStrHeader += `<th  data-header=${i}>${i + 1}
        </th>`
    }
    document.querySelector('thead>tr').innerHTML = templateStrHeader;

    renderTable(arr);

}
function handleSort(e) {
    let col = parseInt(e.target.dataset.header);
    arr.sort((a, b) => {
        if (a[col] === b[col]) {
            return 0;
        } else {
            return (a[col] < b[col]) ? -1 : 1;
        }
    })
    templateStrBody=``;
    renderTable(arr);
}
function handleScroll(e) {
    var lastDiv = document.querySelector("tbody>tr:last-child");
    var lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastDivOffset - 20 && count < maxCount) {
        count++;
        index += 100;
        renderTable(arr);
    }
}
document.addEventListener('scroll', handleScroll);
formTag.addEventListener('submit', handleSubmit);
document.querySelector('thead').addEventListener('click', handleSort);