import e from "express"

const root = document.querySelector('#root')

const getUserId = () => {
     try {
          const queryString = window.location.search
          const urlParams = new URLSearchParams(queryString)
          const userId = urlParams.get('userId')
          return userId
     } catch (error) {
          console.error(error)
          return false
     }
}

const handleGetUser = async () => {
     try {
          const userId = getUserId()
          //@ts-ignore
          const { data } = await axios.post('/users/user-card', {
               userId
          })
          const { user } = data
          root.innerHTML = `Hello ${user.firstName}!`
     } catch (error) {
          console.log(error);
     }
}

const handleLoad = () => {
     handleGetUser()
}
const cells = document.querySelectorAll("block")
const statusText = document.querySelector("statusText")
const restartBtn = document.querySelector("restartBtn")
const winConditions = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8,],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6,]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame()

//function that initialize the game
function initializeGame() {
     cells.forEach(block => block.addEventListener("click", cellClicked))
   //  restartBtn.addEventListener("click", restartGame)
     statusText.textContent = `${currentPlayer}'s turn`
}
function cellClicked() {
     const cellIndex = this.getAttribute("cellIndex");

     if (options[cellIndex] != "" || !running) {
          return;
     }

     updateCell(this, cellIndex);
     checkWinner();
     restartGame()


}
function updateCell(block, index) {
     options[index] = currentPlayer;
     block.textContent = currentPlayer;

} 
function changePlayer() {
     currentPlayer = (currentPlayer == "X") ? "O" : "X";
     statusText.textContent = `${currentPlayer}'s turn`;

} 
 function checkWinner() {
     let roundWon = false;

     for(let i = 0; i < winConditions.length; i++){
          const condition = winConditions[i];
          const cellA = options[condition[0]];
          const cellB = options[condition[1]];
          const cellC = options[condition[2]];

          if(cellA == "" || cellB == "" || cellC == "" ){
               continue;
          }
          if (cellA == cellB && cellB == cellC){
               roundWon = true;
               break;
          }

     }
if(roundWon){
     statusText.textContent = `${currentPlayer} wins!`
     running = false;
}
else if (options.includes("")){
     statusText.textContent = `Draw!`;
     running = false;
}
else{
     changePlayer ();
}
}
 function restartGame() {
     currentPlayer = "X";
     options = ["", "", "", "", "", "", "", "", ""];
     statusText.textContent = `${currentPlayer}'s turn`;
     cells.forEach(block => block.textContent = "");
     running = true;

}
