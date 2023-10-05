const gameBoard = (function () {
    let boardSize = 3;
    const boardArray = new Array(boardSize * boardSize).fill(null);
    const marker = ["O", "X"];

    const findWinCases = function (size) {
        const horizontalWin = [];
        const verticalWin = [];
        const diagonalWin = [[], []];
        for (let i = 0; i < size; i++) {
            diagonalWin[0].push((size + 1) * i);
            diagonalWin[1].push((size - 1) * (i + 1));
            const horizontalTemp = [size * i];
            const verticalTemp = [i];
            for (let j = 1; j < size; j++) {
                horizontalTemp.push(horizontalTemp[0] + j);
                verticalTemp.push(verticalTemp[0] + size * j);
            }
            horizontalTemp.push(horizontalTemp);
            verticalTemp.push(verticalTemp);
        }
    }

    const winCases = findWinCases(boardSize);
    

    const setBoardSize = function (size) {
        boardSize = size;
    }

    const makeMark = function (player, position) {
        if (boardArray[position] !== null) {
            alert("You can't mark here.");
        }
        else {
            boardArray[position] = marker[player.getNumber()];
            player.marks.push(position);
            if (player.marks.length >= boardSize) {
                checkWinner(player);
            }
        }
    }

    const checkWinner = function (player) {
        for (const win in winCases) {
            for (let i = 0; i < win.length; i++) {
                if (!player.marks.includes(win[i])) break;
                if (win[i] !== player.marks.indexOf(win[i])) break;
                if (i === win.length - 1) return player;
            }
        }
        return false;
    }
    return {makeMark,};
})();

const displayController = (function () {
    
})();

const Player = function (name, number) {
    const marks = [];

    const getName = function () {
        return name;
    }
    
    const getNumber = function () {
        return number;
    }
    return {getName, getNumber,};
}

const gameBoardCells = document.querySelectorAll("div.game-board-cell");

gameBoardCells.addEventListener("click", (event) => {
    
})
