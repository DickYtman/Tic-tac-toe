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
const cells = document.querySelectorAll(".block")
const statusText = document.querySelector("#statusText")
const restartBtn = document.querySelector("#restartBtn")
const winConditions = [
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
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

gameStarter()

//function that initialize the game
function gameStarter() {
     cells.forEach(block => block.addEventListener("click", cellClicked))
     restartBtn.addEventListener("click", restartGame)
}
function cellClicked(){
     
}
function updateCell (){
     
}function changePlayer (){
     
}function checkWinner(){
     
}function restartGame (){
     
}
// =======
//   }
// >>>>>>> Stashed changes
