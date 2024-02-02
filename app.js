const gameBoardTable = document.getElementById('gameboard');
const messageDiv = document.getElementById('message');
const scoreDiv = document.getElementById('score');

const foodArray = ['&#127815', '&#127816', '&#127817', '&#127822', '&#127826', '&#129373', '&#129361', '&#127814', '&#129365', '&#127812', '&#127829'];
const boardSize = 20;

let gameBoard = [...Array(boardSize).keys()].map(() => [...Array(boardSize).keys()].map(() => 0));
let snake = [];
let direction = 'u';
let intervalID;
let score = 0;

let foodY, foodX, foodEmojiIndex;

initializeGame();

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            direction = 'u';
            break;
        case 'ArrowDown':
            direction = 'd';
            break;
        case 'ArrowLeft':
            direction = 'l';
            break;
        case 'ArrowRight':
            direction = 'r';
            break;
    }
});

function initializeGame() {
    clearInterval(intervalID);
    gameBoard = [...Array(boardSize).keys()].map(() => [...Array(boardSize).keys()].map(() => 0));
    snake = [];
    direction = 'u';
    score = 0;
    scoreDiv.textContent = `Score: ${score}`;
    addSnake();
    addFood();
    intervalID = setInterval(playGame, 200);
}

function playGame() {
    let [cursorY, cursorX] = calculateNewCursor();

    if (ifHitsBorder(cursorY, cursorX) || ifHitsItself(cursorY, cursorX)) {
        endGame();
        return;
    }

    snake.unshift(cursorY + '_' + cursorX);
    if (cursorY == foodY && cursorX == foodX) {
        addFood();
        snake.push(undefined);
        score++;
        scoreDiv.textContent = `Score: ${score}`;
    } else {
        snake.pop();
    }

    drawGameBoard();
}

function addSnake() {
    const snakeY = parseInt(boardSize / 2);
    const snakeX = parseInt(boardSize / 2);
    gameBoard[snakeY][snakeX] = 's';
    snake.push(snakeY + '_' + snakeX);
}

function drawGameBoard() {
    gameBoardTable.innerHTML = '';

    gameBoard.forEach((row, y) => {
        const boardRowTr = document.createElement('tr');
        row.forEach((cell, x) => {
            const boardCellTd = document.createElement('td');
            const id = y + '_' + x;
            boardCellTd.setAttribute('id', id);

            if (snake.includes(id)) {
                // Snake body
                boardCellTd.textContent = '🟢'; 
            } else if (y === foodY && x === foodX) {
                // Food
                boardCellTd.innerHTML = foodArray[foodEmojiIndex];
            }

            boardRowTr.append(boardCellTd);
        });
        gameBoardTable.append(boardRowTr);
    });
}


function calculateNewCursor() {
    let [y, x] = snake[0].split('_');

    switch (direction) {
        case 'u':
            y--;
            break;
        case 'd':
            y++;
            break;
        case 'l':
            x--;
            break;
        case 'r':
            x++;
            break;
    }

    if (y == foodY && x == foodX) {
        addFood();
        score++;
        scoreDiv.textContent = `Score: ${score}`;
        snake.push(undefined);
    }

    return [y, x];
}

function ifHitsBorder(y, x) {
    if (y < 0 || y >= boardSize || x < 0 || x >= boardSize) {
        return true;
    }
    return false;
}

function ifHitsItself(y, x) {
    if (snake.includes(y + '_' + x)) {
        return true;
    }
    return false;
}

function addFood() {
    do {
        foodY = Math.floor(Math.random() * boardSize);
        foodX = Math.floor(Math.random() * boardSize);
        foodEmojiIndex = Math.floor(Math.random() * foodArray.length);
    } while (snake.includes(foodY + '_' + foodX))
}

function endGame() {
    clearInterval(intervalID);
    messageDiv.innerText = 'Game Over';
    messageDiv.classList.remove('hidden');
}
