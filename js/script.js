const gameBoard = (function () {
    let boardSize = 3;
    let turns = 0;
    
    const marker = ["O", "X"];
    const boardArray = new Array(boardSize * boardSize).fill(null);
    const players = new Array(2);

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
            horizontalWin.push(horizontalTemp);
            verticalWin.push(verticalTemp);
        }
        return [...horizontalWin, ...verticalWin, ...diagonalWin];
    }

    const winCases = findWinCases(boardSize);
    
    const setBoardSize = function (size) {
        boardSize = size;
    }

    const makeMark = function (position) {
        if (boardArray[position] !== null) {
            alert("You can't mark here.");
            return marker[(turns - 1) % 2];
        }
        else {
            const tempTurn = turns % 2;
            boardArray[position] = marker[tempTurn];
            players[tempTurn].getMarks().push(position);
            if (turns === boardSize * boardSize - 1) {
                finishGame(-1);
            }
            else if (players[tempTurn].getMarks().length >= boardSize) {
                if (checkWinner(players[tempTurn])) {
                    finishGame(tempTurn);
                }
            }
            turns++;
            return marker[tempTurn];
        }
    }

    const checkWinner = function (player) {
        const tempMarks = player.getMarks().sort((a, b) => a - b);
        for (const win of winCases) {
            if (tempMarks.indexOf(win[0]) === -1) continue;
            for (let i = 0; i < win.length; i++) {
                if (i !== 0 && win[i] !== tempMarks[tempMarks.indexOf(win[0]) + i]) break;
                if (i === win.length - 1) return true;
            }
        }
        return false;
    }

    const startGame = function () {
        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i] = null;
        }
        turns = 0;
        
        displayController.initializeDisplay();
        players[0] = new Player(prompt("Player 1's name:"));
        players[1] = new Player(prompt("Player 2's name:"));
        displayController.initializeNames(players);
    }

    const finishGame = function (result) {
        displayController.showResultDisplay(result);
        displayController.disableDisplay();
    }

    const getPlayers = function () {
        return players;
    }

    return {startGame, finishGame, makeMark, getPlayers};
})();

const displayController = (function () {
    const gameBoardCells = document.querySelectorAll("div.game-board-cell");
    const gameBoardDiv = document.querySelector("div.game-board");
    const playerContainers = document.querySelectorAll("div.player-container");
    const startButton = document.querySelector("button.start-button");

    const startButtonEventListener = function (event) {
        gameBoard.startGame();
    }

    startButton.addEventListener("click", startButtonEventListener);

    const cellEventListener = function (event) {
        event.target.textContent = gameBoard.makeMark(+ event.target.getAttribute("data-position"));
    }

    const initializeDisplay = function () {
        for (cell of gameBoardCells) {
        cell.addEventListener("click", cellEventListener);
        }
        for (cell of gameBoardCells) {
            cell.textContent = "";
        }
        startButton.removeEventListener("click", startButtonEventListener);
        startButton.textContent = "Restart";
       
    }

    const showResultDisplay = function (result) {
        switch (result) {
            case -1:
                alert("Tie");
                break;
            case 0:
                alert(`${gameBoard.getPlayers()[0].getName()} won`);
                break;
            case 1:
                alert(`${gameBoard.getPlayers()[1].getName()} won`);
                break;
        }
    }

    const disableDisplay = function () {
        for (cell of gameBoardCells) {
            cell.removeEventListener("click", cellEventListener);
        }
        startButton.addEventListener("click", startButtonEventListener);
    }

    const initializeNames = function (players) {
        for (let i = 0; i < players.length; i++) {
            playerContainers[i].textContent = `Player ${i + 1}: ${players[i].getName()}`;
        }
    }
    

  
    return {initializeDisplay, showResultDisplay, disableDisplay, initializeNames,};
})();

const Player = function (name, number) {
    const marks = [];

    const getName = function () {
        return name;
    }

    const getNumber = function () {
        return number
    }

    const getMarks = function () {
        return marks;
    }
    
    return {getName, getNumber, getMarks,};
}
