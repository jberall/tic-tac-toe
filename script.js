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
  //   sets the cell key value
  document.getElementById(squareId).innerText = player;
  /** check if game won */
  let gameWon = checkWin(origBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  }
}

function checkWin(board, player) {
  //   console.log(origBoard, player);
  /**
   * all the places on the board that have already been played in
   * returns the accumulator and initialize with []
   * e = element
   * i = index
   * finds all the index the player has touched
   */
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  //   console.clear();
  //   console.log(plays);
  let gameWon = null;

  /**
   * loop thru every win combo
   * winCombo.entries returns the index and win
   */
  for (let [index, win] of winCombos.entries()) {
    // console.log(index, win);
    /**
     * win.every go thru every element in the win
     * has the player played in every spot to check for win combo.
     */
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = { index, player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayer ? 'blue' : 'red';
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }
}
