const CROSS_SVG = "<svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 10L110 110M110 10L10 110\" stroke=\"black\" stroke-width=\"20\" stroke-linecap=\"round\"/></svg>";
const CIRCLE_SVG = "<svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"60\" cy=\"60\" r=\"50\" stroke=\"black\" stroke-width=\"20\"/></svg>";

const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let pieces = ["", "", "", "", "", "", "", "", ""];
let player = "o";

let xBot = {
  myself: "x",
  enemy: "o",

  play() {
    /*
    for (let i in pieces) {
      if (pieces[i] === "") {
        placePiece(i, this.myself);
        return
      }
    }
    */
    placePiece(Math.floor(Math.random() * 9), this.myself);
  }
}

//region FUNCTIONS
function placePiece(position, piece) {
  if (pieces[position] !== "") {
    console.error(`There is already a piece here (position ${position})`);
    return;
  }
  if (piece !== player) {
    console.error(`This is not your turn (${piece} tried to play)`);
    return;
  }
  document.querySelector(`#cell${position}`).innerHTML = (piece === "x" ? CROSS_SVG : CIRCLE_SVG);
  pieces[position] = piece;
  player = (player === "x" ? "o" : "x");
  const winner = checkForWinner();
  if (winner !== "") {
    winGame(winner);
  }
}

function checkForWinner() {
  for (let line of LINES) {
    if (pieces[line[0]] === pieces[line[1]] && pieces[line[1]] === pieces[line[2]] && pieces[line[0]] !== "") {
      return pieces[line[0]];
    }
  }
  return "";
}

function playerPlay(pos) {
  placePiece(parseInt(pos.target.id.slice(-1)), "o");
}

function winGame(winner) {
  console.log(`${winner} has won the game`);
  clearInterval(game);
  for (let i = 0; i < 9; i++) {
    document.querySelector(`#cell${i}`).removeEventListener("click", playerPlay);
  }
}
//endregion

for (let i = 0; i < 9; i++) {
  document.querySelector(`#cell${i}`).addEventListener("click", playerPlay)
}

let game = setInterval(() => {
  if (player === "x") {
    xBot.play();
  }
}, 5);