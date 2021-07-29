import { winCombos } from "./checkWinner";

const humanPlayer = "X";
const aiPlayer = "0";

/**
 * Check winner with 
 * possible game play moves
 * @param {*} board
 * @param {*} player
 */
function checkWin(board, player) {
  let plays = board.reduce((result, item, index) => (item === player ? result.concat(index) : result), []);
  let isWinner = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      isWinner = { index: index, player: player };
      break;
    }
  }
  return isWinner;
}

function emptySquares(newBoard) {
  return newBoard.filter((s) => typeof s == "number");
}
/**
 * minimax - recursive algorithm for 
 * finding index for best move
 * @export
 * @param {*} newBoard
 * @param {*} player
 * @returns
 */
export function minimax(newBoard, player) {
  let availableSpots = emptySquares(newBoard);

  if (checkWin(newBoard, humanPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availableSpots.length === 0) {
    return { score: 0 };
  }
  
  let moves = [];
  for (let availIndex = 0; availIndex < availableSpots.length; availIndex++) {
    let move = {};
    move.index = newBoard[availableSpots[availIndex]];
    newBoard[availableSpots[availIndex]] = player;

    if (player === aiPlayer) {
      let result = minimax(newBoard, humanPlayer);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availableSpots[availIndex]] = move.index;

    moves.push(move);
  }

  let bestMove;
  if (player === aiPlayer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
