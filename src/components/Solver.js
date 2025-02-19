class Solver {
  constructor(initialState, goalState) {
    this.initialState = initialState;
    this.goalState = goalState;
  }

  solve() {
    const initialStateString = this.boardToString(this.initialState);
    const goalStateString = this.boardToString(this.goalState);
    const visited = new Set();
    const priorityQueue = [{ state: this.initialState, moves: [], cost: 0, heuristic: this.manhattanDistance(this.initialState) }];
    visited.add(initialStateString);

    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => a.cost + a.heuristic - (b.cost + b.heuristic));
      const { state, moves, cost } = priorityQueue.shift();

      if (this.boardToString(state) === goalStateString) {
        return { steps: moves.concat([state]), finalState: state };
      }

      const blankPos = this.findBlank(state);
      const possibleMoves = this.getPossibleMoves(blankPos);

      for (const move of possibleMoves) {
        const nextState = this.moveTile(state, blankPos, move);
        const nextStateString = this.boardToString(nextState);

        if (!visited.has(nextStateString)) {
          visited.add(nextStateString);
          priorityQueue.push({
            state: nextState,
            moves: [...moves, state], // Use spread syntax to flatten moves array
            cost: cost + 1,
            heuristic: this.manhattanDistance(nextState),
          });
        }
      }
    }
    return null; // No solution found
  }


  manhattanDistance(board) {
    let distance = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const value = board[row][col];
        if (value !== 0) {
          const goalRow = Math.floor((value - 1) / 3);
          const goalCol = (value - 1) % 3;
          distance += Math.abs(row - goalRow) + Math.abs(col - goalCol);
        }
      }
    }
    return distance;
  }


  boardToString(board) {
    return board.map(row => row.join('')).join('');
  }

  findBlank(currentBoard) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (currentBoard[row][col] === 0) {
          return { row, col };
        }
      }
    }
    return null;
  }

  getPossibleMoves(blankPos) {
    const possibleMoves = [];
    const { row, col } = blankPos;

    if (row > 0) possibleMoves.push({ row: row - 1, col }); // Up
    if (row < 2) possibleMoves.push({ row: row + 1, col }); // Down
    if (col > 0) possibleMoves.push({ row, col: col - 1 }); // Left
    if (col < 2) possibleMoves.push({ row, col: col + 1 }); // Right

    return possibleMoves;
  }

  moveTile(currentBoard, blankPos, tilePos) {
    const newBoard = currentBoard.map(row => [...row]);
    const blankValue = newBoard[blankPos.row][blankPos.col];
    const tileValue = newBoard[tilePos.row][tilePos.col];

    newBoard[blankPos.row][blankPos.col] = tileValue;
    newBoard[tilePos.row][tilePos.col] = blankValue;
    return newBoard;
  }
}

export default Solver;
