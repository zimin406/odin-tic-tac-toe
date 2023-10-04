const gameBoard = (function () {
    const boardArray = new Array(9).fill(null);
    const marker = ["O", "X"];
    const winCases = [
        [0, 1, 2], [3, 4, 5] , [6, 7, 8],
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
                checkFinished(player);
            }
        }
    }
    const checkFinished = function (player) {
        
    }
    return {};
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
