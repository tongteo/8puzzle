import React from 'react';
import './Controls.css';

function Controls({ moves, isSolved, onShuffle, onSolve }) {
  return (
    <div className="controls">
      <p>Moves: {moves}</p>
      {isSolved && <p className="solved-message">Puzzle Solved!</p>}
      <div className="buttons">
        <button onClick={onShuffle}>Shuffle</button>
        <button onClick={onSolve} disabled={isSolved}>Solve</button>
      </div>
    </div>
  );
}

export default Controls;
