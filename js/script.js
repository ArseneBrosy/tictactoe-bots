const CROSS_SVG = "<svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 10L110 110M110 10L10 110\" stroke=\"black\" stroke-width=\"20\" stroke-linecap=\"round\"/></svg>";
const CIRCLE_SVG = "<svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"60\" cy=\"60\" r=\"50\" stroke=\"black\" stroke-width=\"20\"/></svg>";

const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const LINES_NAME = ["horizontal-top", "horizontal-center", "horizontal-bottom", "vertical-left", "vertical-center", "vertical-right", "diagonal-left", "diagonal-right"];
const PLAYER_NAMES = {
  x: "Arsène",
  o: "Alex"
}
let pieces = ["", "", "", "", "", "", "", "", ""];
let player = "x";

let xBot = {
  myself: "x",
  enemy: "o",

  findWinPositions(pieces, advance) {
    if (advance === 0) {
      let winPositions = [];
      for (let line of LINES) {
        let placed = 0;
        let unplacedpos = -1;
        for (let pos of line) {
          if (pieces[pos] === this.myself) {
            placed++;
          }
          if (pieces[pos] === "") {
            unplacedpos = pos;
          }
        }
        if (placed === 2 && unplacedpos !== -1) {
          winPositions.push(unplacedpos);
        }
      }
      return winPositions
    } else {
      let winPositions = [];
      for (let i = 0; i < 9; i++) {
        if (pieces[i] === "") {
          let newPieces = JSON.parse(JSON.stringify(pieces));
          newPieces[i] = this.myself;
          let winPos = this.findWinPositions(newPieces, advance - 1);
          let loosePos = this.findLoosePositions(newPieces);
          if (winPos.length >= 2 && loosePos.length === 0) {
            winPositions.push(i);
          }
        }
      }
      return winPositions
    }
  },

  findLoosePositions(pieces) {
    let loosePositions = [];
    for (let line of LINES) {
      let placed = 0;
      let unplacedpos = -1;
      for (let pos of line) {
        if (pieces[pos] === this.enemy) {
          placed++;
        }
        if (pieces[pos] === "") {
          unplacedpos = pos;
        }
      }
      if (placed === 2 && unplacedpos !== -1) {
        loosePositions.push(unplacedpos);
      }
    }
    return loosePositions;
  },

  play() {
    // Win
    let winPos = this.findWinPositions(pieces, 0)
    if (winPos.length > 0) {
      placePiece(winPos[0], this.myself);
      return;
    }

    // Enemy will win
    let loosePos = this.findLoosePositions(pieces)
    if (loosePos.length > 0) {
      placePiece(loosePos[0], this.myself);
      return;
    }

    for (let i = 1; i < 3; i++) {
      winPos = this.findWinPositions(pieces, i)
      if (winPos.length > 0) {
        placePiece(winPos[0], this.myself);
        return;
      }
    }

    placePiece(parseInt(window.prompt("pos")), this.myself);
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
  for (let i in LINES) {
    if (pieces[LINES[i][0]] === pieces[LINES[i][1]] && pieces[LINES[i][1]] === pieces[LINES[i][2]] && pieces[LINES[i][0]] !== "") {
      document.querySelector(`#${LINES_NAME[i]}`).style.display = "block";
      return pieces[LINES[i][0]];
    }
  }
  return "";
}

function playerPlay(pos) {
  placePiece(parseInt(pos.target.id.slice(-1)), "o");
}

function winGame(winner) {
  clearInterval(game);
  for (let i = 0; i < 9; i++) {
    document.querySelector(`#cell${i}`).removeEventListener("click", playerPlay);
  }
  setTimeout(() => {
    document.querySelector("#winner").innerHTML = `${winner} (controlled by ${PLAYER_NAMES[winner]}) has won the game`;
    document.querySelector("#end").style.display = "block";
  }, 550)
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