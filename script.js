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

// keep track of function calls
var fc = 0;
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
  //   console.log('here', typeof origBoard[square.target.id]);
  //   console.log(square.target.id);
  //   check if the square has been clicked
  if (typeof origBoard[square.target.id] == 'number') {
    turn(square.target.id, huPlayer);
    if (!checkTie()) {
      // turn(bestSpot(), aiPlayer);
      if (!checkWin(origBoard, huPlayer) && !checkTie())
        turn(bestSpot(), aiPlayer);
    }
  }
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
      gameWon = { index: index, player: player };
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
  declareWinner(gameWon.player == huPlayer ? 'You Win!' : 'You Lose!');
}

/**
 * @returns {Array} first empty square
 */
function emptySquares() {
  return origBoard.filter(s => typeof s == 'number');
}

/**
 * how to find the best spot for the ai Player
 */
function bestSpot() {
  // return emptySquares()[0];
  const miniMax = minimax(origBoard, aiPlayer);
  // console.log(miniMax);
  return miniMax.index;
}
function declareWinner(who) {
  document.querySelector('.endgame').style.display = 'block';
  document.querySelector('.endgame .text').innerHTML = who;
}
/**
 * if all the squares are used up it's a tie.
 */
function checkTie() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = 'green';
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner('Tie Game!');
    return true;
  }
  return false;
}

/**
 * Ai Logic to never loose
 * when human wins score: -10
 * when ai wins score: 10
 * tie = score: 0
 * @param {*} newBoard latest board
 * @param {huPlayer | aiPlayer} player
 */
function minimax(newBoard, player) {
  //keep track of function calls;
  // console.log('function calls: ' + fc);
  fc++;
  // gets the emptySquares
  var availSpots = emptySquares(newBoard);
  // check to see if game over
  // human wins
  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
    // aiPlayer wins
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
    // tie no more room to play
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  // need moves to collect the scores to evaluate later
  var moves = [];

  // loop through empty spots
  for (var i = 0; i < availSpots.length; i++) {
    // collect each move and index and score
    var move = {};
    // set move.index
    move.index = newBoard[availSpots[i]];
    // set empty spot on the new board to the current player
    newBoard[availSpots[i]] = player;
    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }
    // set empty spot on the new board to the current player
    newBoard[availSpots[i]] = move.index;

    moves.push(move);
    var bestMove;
    if (player === aiPlayer) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  }
  return moves[bestMove];
}
