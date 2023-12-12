const CROSS_SVG = "<svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 10L110 110M110 10L10 110\" stroke=\"black\" stroke-width=\"20\" stroke-linecap=\"round\"/></svg>";
const CIRCLE_SVG = "<svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"60\" cy=\"60\" r=\"50\" stroke=\"black\" stroke-width=\"20\"/></svg>";

const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let pieces = ["", "", "", "", "", "", "", "", ""];

function placePiece(position, piece) {
  document.querySelector(`#cell${position}`).innerHTML = (piece === "x" ? CROSS_SVG : CIRCLE_SVG);
  pieces[position] = piece;
  const winner = checkForWinner();
  if (winner !== "") {
    console.log(winner);
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