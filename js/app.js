const appWrapper = document.querySelector('.ttt-wrapper');
const items = document.querySelectorAll('.ttt-item');
const whoseMoveText = document.querySelector('.whose-move p');
const popUp = document.querySelector('.pop-up');
const winnerText = document.querySelector('.winner-text');

let arrCircles = [];
let arrCrosses = [];
let arrWinCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let arrToAnimation;
let isMoveCircle = true;
let isDraw;

const whomMove = () => {
    if (isMoveCircle)
        whoseMoveText.textContent = 'kółko';
    else
        whoseMoveText.textContent = 'krzyżyk';
}

const createTheElement = (el, className) => {
    const item = document.createElement('div');
    item.classList.add(className);
    el.appendChild(item);
}

const clearApp = () => {
    arrCircles = [];
    arrCrosses = [];
    arrToAnimation = undefined;
    isDraw = undefined;
    winnerText.textContent = '';
    
    items.forEach(item => {
        item.innerHTML = '';
        item.addEventListener('click', callTheFunctions)
    });

    popUp.classList.remove('show');
    whomMove();
}

const checkIsDraw = () => {
    if ((arrCircles.length + arrCrosses.length == 9) && isDraw) {
        winnerText.textContent = 'Remis';
        popUp.classList.add('show');
    }
}

const checkWinCases = arr => {
    for (const item of arrWinCases) {
        if (item.every(value => arr.includes(value))) {
            arrToAnimation = item.filter(value => arr.includes(value));
            winnerText.textContent = `Wygrały ${arr == arrCircles ? 'kółka' : 'krzyżyki'}`;
            items.forEach(item => item.removeEventListener('click', callTheFunctions));
            popUp.classList.add('show');
            isDraw = false;
            return;
        } else {
            isDraw = true;
            checkIsDraw();
        }
    }
}

const addTheAnimationOfWin = () => {
    if (typeof (arrToAnimation) == 'undefined')
        return;

    for (const item of arrToAnimation) {
        if(!isMoveCircle)
            items[item].firstChild.classList.add('ttt-item__circle--animation');

        items[item].firstChild.classList.add('ttt-item--animation');
    }
}

const checkWhomMove = e => {
    if (e.target.hasChildNodes())
        return;

    if (isMoveCircle) {
        createTheElement(e.target, 'ttt-item__circle');
        arrCircles.push(parseInt(e.target.id));
        checkWinCases(arrCircles);
        isMoveCircle = false;
    } else {
        createTheElement(e.target, 'ttt-item__cross');
        arrCrosses.push(parseInt(e.target.id));
        checkWinCases(arrCrosses);
        isMoveCircle = true;
    }   
    addTheAnimationOfWin();
}

const callTheFunctions = e => {
    checkWhomMove(e);    
    whomMove();
}

items.forEach(item => {
    item.addEventListener('click', callTheFunctions);
})
popUp.addEventListener('click', clearApp);
whomMove();