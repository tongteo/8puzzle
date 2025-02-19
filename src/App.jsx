import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import Solver from './components/Solver';

function App() {
  const initialBoard = [
    [1, 2, 3],
    [8, 0, 4],
    [7, 6, 5],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [solutionSteps, setSolutionSteps] = useState([]);

  useEffect(() => {
    checkSolved();
  }, [board]);

  const shuffleBoard = () => {
    let shuffledBoard = [...initialBoard.map(row => [...row])];
    for (let i = 0; i < 1000; i++) {
      const blankPos = findBlank(shuffledBoard);
      const possibleMoves = getPossibleMoves(blankPos);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      shuffledBoard = moveTile(shuffledBoard, blankPos, randomMove);
    }
    setBoard(shuffledBoard);
    setMoves(0);
    setIsSolved(false);
    setSolutionSteps([]);
  };

  const moveTile = (currentBoard, blankPos, tilePos) => {
    const newBoard = currentBoard.map(row => [...row]);
    const blankValue = newBoard[blankPos.row][blankPos.col];
    const tileValue = newBoard[tilePos.row][tilePos.col];

    newBoard[blankPos.row][blankPos.col] = tileValue;
    newBoard[tilePos.row][tilePos.col] = blankValue;
    return newBoard;
  };


  const handleTileClick = (tilePos) => {
    if (isSolved) return;

    const blankPos = findBlank(board);
    const possibleMoves = getPossibleMoves(blankPos);

    if (possibleMoves.some(move => move.row === tilePos.row && move.col === tilePos.col)) {
      const newBoard = moveTile(board, blankPos, tilePos);
      setBoard(newBoard);
      setMoves(moves + 1);
    }
  };

  const findBlank = (currentBoard) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (currentBoard[row][col] === 0) {
          return { row, col };
        }
      }
    }
    return null;
  };

  const getPossibleMoves = (blankPos) => {
    const possibleMoves = [];
    const { row, col } = blankPos;

    if (row > 0) possibleMoves.push({ row: row - 1, col }); // Up
    if (row < 2) possibleMoves.push({ row: row + 1, col }); // Down
    if (col > 0) possibleMoves.push({ row, col: col - 1 }); // Left
    if (col < 2) possibleMoves.push({ row, col: col + 1 }); // Right

    return possibleMoves;
  };

  const checkSolved = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] !== initialBoard[row][col]) {
          setIsSolved(false);
          return;
        }
      }
    }
    setIsSolved(true);
  };

  const solvePuzzle = () => {
    const solver = new Solver(board, initialBoard);
    const solution = solver.solve();
    if (solution) {
      setSolutionSteps(solution.steps);
      setBoard(solution.finalState);
    } else {
      alert("No solution found!");
    }
  };


  return (
    <div className="app">
      <h1>Sliding Puzzle</h1>
      <Board board={board} onTileClick={handleTileClick} />
      <Controls
        moves={moves}
        isSolved={isSolved}
        onShuffle={shuffleBoard}
        onSolve={solvePuzzle}
      />
      {solutionSteps.length > 0 && (
        <div className="solution-steps">
          <h2>Solution Steps:</h2>
          <ol>
            {solutionSteps.map((step, index) => (
              <li key={index}>
                <Board board={step} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
