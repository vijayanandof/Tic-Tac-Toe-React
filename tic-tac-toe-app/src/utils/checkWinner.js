export function checkWinner(gameState) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  console.log("checkWinner: ", gameState[0], gameState[1], gameState[2]);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
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
  if (gameState.filter(Boolean).length === 9) {
    return true;
  }
}
