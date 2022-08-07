var cells = document.querySelectorAll(".block");
var statusText = document.querySelector("#statusText");
var restartBtn = document.querySelector("#restartBtn");
var winConditions = [
    [0, 1, 2],
    // <<<<<<< Updated upstream
    [3, 4, 5],
    [6, 7, 8,],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6,]
];
var options = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var running = false;
gameStarter();
//function that initialize the game
function gameStarter() {
    cells.forEach(function (block) { return block.addEventListener("click", cellClicked); });
    restartBtn.addEventListener("click", restartGame);
}
function cellClicked() {
}
function updateCell() {
}
function changePlayer() {
}
function checkWinner() {
}
function restartGame() {
}
// =======
//   }
// >>>>>>> Stashed changes
