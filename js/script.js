const gameBoard = (function () {
    const boardArray = new Array(9).fill(null);
    const marker = ["O", "X"];
    const winCases = [
        [0, 1, 2], [3, 4, 5] , [6, 7, 8],
        [0, 3, 5], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    const makeMark = function (player, position) {
        if (boardArray[position] !== null) {
            alert("You can't mark here.");
        }
        else {
            boardArray[position] = marker[player.getNumber()];
            player.marks.push(position);
            if (player.marks.length >= 3) {
                checkWinner(player);
            }
        }
    }
    const checkWinner = function (player) {
        for (const winCase in winCases) {
            for (let i = 0; i < winCase.length; i++) {
                if (!player.marks.includes(winCase[i])) break;
                if (winCase[i] !== player.marks.indexOf(winCase[i])) break;
                if (i === winCase.length - 1) return player;
            }
        }
        return false;
    }
    return {makeMark,};
})();

const displayController = (function () {
    
})();

const Player = function (name, number) {
    const name = name;
    const number = number;
    const marks = [];

    const getNumber = function () {
        return number;
    }
    return {getNumber,};
}
