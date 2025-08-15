// Write your code here.
const gameSquares = document.querySelectorAll('.game-square');
const heading = document.getElementById("game-heading");
const restartButton = document.getElementById("restart-button")
let currentPlayer = 1;
let moveCount = 0

const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

gameSquares.forEach(gameSquare => gameSquare.addEventListener('click', makeMove));
restartButton.addEventListener("click", restartGame);

function makeMove() {
    this.textContent = currentPlayer === 1 ? 'X' : 'O';
    moveCount++;
    this.disabled = true;
    if (didPlayerWin()) {
        //show restart
        heading.textContent = `Player ${currentPlayer} Won!`;
        endGame()
    } else if (moveCount === 9) {
        //tie
        heading.textContent = "Tie Game!"
        endGame();

    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        heading.textContent = `Player ${currentPlayer}'s Turn`
    }
}

function didPlayerWin() {
    return WIN_CONDITIONS.some(winCondition => {
        return winCondition.every(index => {
            const currentPlayerText = currentPlayer === 1 ? 'X' : 'O';
            return gameSquares[index].textContent === currentPlayerText;
        })
    })
}

function endGame() {
    for (const gameSquare of gameSquares) {
        gameSquare.disabled = true;
    }
    restartButton.style.display = "block"
}


function restartGame() {
    currentPlayer = 1;
    heading.textContent = `Player ${currentPlayer}'s Turn`;
    moveCount = 0;
    for (let gameSquare of gameSquares) {
        gameSquare.textContent = "";
        gameSquare.disabled = false;
    }
    restartButton.style.display = "none";
}