const start = document.querySelector(".start");
const play = document.querySelector(".play");
const container = document.querySelector(".container");
const playerOneInput = document.querySelector(".player1-name-input");
const playerTwoInput = document.querySelector(".player2-name-input");
const playerOneName = document.querySelector(".player1-name");
const playerTwoName = document.querySelector(".player2-name");
const playerOneScore = document.querySelector(".player1-score");
const playerTwoScore = document.querySelector(".player2-score");
const cells = document.querySelectorAll(".game-box");
const statusText = document.querySelector("#status-text");
const statusTextColor = document.querySelector(".status-text");
const restartBtn = document.querySelector(".reset");
let scorePlayerOne = 0;
let scorePlayerTwo = 0;

start.addEventListener("click", function (e) {
  if (playerOneInput.value != "" && playerTwoInput.value != "") {
    e.preventDefault();
    play.classList.add("hidden");
    container.classList.remove("hidden");
    playerOneName.textContent = `${playerOneInput.value}: `;
    playerTwoName.textContent = `${playerTwoInput.value}: `;
    updateStatusText();
  }
});

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
  updateStatusText();
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  //if the cell is not empty, do nothing
  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  updateStatusText();
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => (cell.textContent = ""));
    updateStatusTextWin();
    statusTextColor.classList.add("neon");
    if (currentPlayer == "X") {
      scorePlayerOne++;
      playerOneScore.textContent = scorePlayerOne;
    } else {
      scorePlayerTwo++;
      playerTwoScore.textContent = scorePlayerTwo;
    }
  } else if (!options.includes("")) {
    statusText.textContent = `Draw`;
    statusTextColor.classList.remove("neon");
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => (cell.textContent = ""));
    updateStatusText();
  } else {
    changePlayer();
    statusTextColor.classList.remove("neon");
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  updateStatusText();
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
  statusTextColor.classList.remove("neon");
  location.reload();
}

function updateStatusText() {
  if (currentPlayer === "X") {
    statusText.textContent = `${playerOneInput.value}'s turn`;
  } else {
    statusText.textContent = `${playerTwoInput.value}'s turn`;
  }
}
function updateStatusTextWin() {
  if (currentPlayer === "X") {
    statusText.textContent = `${playerOneInput.value} WON the round`;
  } else {
    statusText.textContent = `${playerTwoInput.value} WON the round`;
  }
}
