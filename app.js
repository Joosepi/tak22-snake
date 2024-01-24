const gameBarDiv = document.getElementById('gameboard');

const boardSize = 10;

let gameBoard = [...Array(boardSize).keys()].map(() => [...Array(boardSize).keys()].map(() => 0));

snakeY = parseInt(boardSize / 2 );
snakeX = parseInt(boardSize / 2 );

gameBoard[snakeY][snakeX] = 's';

gameBoard.forEach((row, y) => { 
    const boardRowTr = document.createElement('tr');
    row.forEach((cell, x) => { 
        console.log(y, x);
        const boardCellTd = document.createElement('td');
        boardCellTd.setAttribute('id', y + '_' + x);
        if (gameBoard[y][x] == 's') {
            boardCellTd.classList.add(snake);
        }
        boardRowTr.appendChild(boardCellTd);
    });
    gameBoardTable.appendChild(boardRowTr);
});

gameBarDiv.appendChild(gameBoardTable);


console.log(gameBoard)