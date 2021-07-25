export const winCombos = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagnols
    [2, 4, 6],
  ];

export function checkWinner(gameState) {
  console.debug("checkWinner: ", gameState[0], gameState[1], gameState[2]);
  for (let i = 0; i < winCombos.length; i++) {
    const [a, b, c] = winCombos[i];
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return gameState[a];
    }
  }

  return checkForDraw(gameState) ? "Draw" : null;
}

function checkForDraw(gameState) {
  if (gameState.filter(s => typeof s === 'string').length === 9) {
    return true;
  }
}
