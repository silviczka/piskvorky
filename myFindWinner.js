const WIN_LENGTH = 5;

export const myFindWinner = (boardState) => {
  const boardSize = boardState.length;

  // Check rows for a winner
  let row = 0;
  while (row < boardSize) {
    for (let col = 0; col <= boardSize - WIN_LENGTH; col++) {
      const segment = boardState[row].slice(col, col + WIN_LENGTH);
      if (segment.every((cell) => cell === 'o')) return 'o';
      if (segment.every((cell) => cell === 'x')) return 'x';
    }
    row++;
  }

  // Check columns for a winner
  let col = 0;
  while (col < boardSize) {
    for (let row = 0; row <= boardSize - WIN_LENGTH; row++) {
      const segment = [];
      for (let i = 0; i < WIN_LENGTH; i++) {
        segment.push(boardState[row + i][col]); //.push() adds new item to the end of an array
      }
      if (segment.every((cell) => cell === 'o')) return 'o';
      if (segment.every((cell) => cell === 'x')) return 'x';
    }
    col++;
  }

  // Check diagonals (top-left to bottom-right)
  row = 0;
  while (row <= boardSize - WIN_LENGTH) {
    for (let col = 0; col <= boardSize - WIN_LENGTH; col++) {
      const segment = [];
      for (let i = 0; i < WIN_LENGTH; i++) {
        segment.push(boardState[row + i][col + i]);
      }
      if (segment.every((cell) => cell === 'o')) return 'o';
      if (segment.every((cell) => cell === 'x')) return 'x';
    }
    row++;
  }

  // Check oposite direction diagonals (top-right to bottom-left)
  row = 0;
  while (row <= boardSize - WIN_LENGTH) {
    for (let col = WIN_LENGTH - 1; col < boardSize; col++) {
      const segment = [];
      for (let i = 0; i < WIN_LENGTH; i++) {
        segment.push(boardState[row + i][col - i]);
      }
      if (segment.every((cell) => cell === 'o')) return 'o';
      if (segment.every((cell) => cell === 'x')) return 'x';
    }
    row++;
  }
  // Check for tie (no empty cells)
  const isTie = boardState.every((row) =>
    row.every((cell) => cell === 'o' || cell === 'x'),
  );
  if (isTie) return 'tie';

  return null; // No winner, no tie, game is still on
};
