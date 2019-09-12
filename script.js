var origBoard;
/** Human Player */
const huPlayer = '0';
/** Artificial Intelligence Player */
const aiPlayer = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
  document.querySelector('.endgame').style.display = 'none';
  /** makes array from every number from 0 - 9 */
  origBoard = Array.from(Array(9).keys());
  //   console.log(origBoard);
  /** loop thru each cell */
  for (var i = 0; i < cells.length; i++) {
    /** reset cell text value */
    cells[i].innerHTML = '';
    /** reset background color */
    cells[i].style.removeProperty('background-color');
    /** add event listener */
    cells[i].addEventListener('click', turnClick, false);
  }
}

/**
 *
 * @param {clickEvent} square
 */
function turnClick(square) {
  //   console.log(square.target.id);
  turn(square.target.id, huPlayer);
}

/**
 *
 * @param {number} squareId
 * @param {huPlayer | aiPlayer} player
 */
function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
}
