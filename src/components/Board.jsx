import React from 'react';
import Tile from './Tile';
import './Board.css';

function Board({ board, onTileClick }) {
  if (!Array.isArray(board)) {
    console.error("Board prop is not an array:", board);
    return <div>Error: Board data is not an array</div>;
  }
  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        if (!Array.isArray(row)) {
          console.error("Row is not an array:", row);
          return <div key={rowIndex}>Error: Row data is not an array</div>;
        }
        return (
          <div key={rowIndex} className="row">
            {row.map((tileValue, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                value={tileValue}
                position={{ row: rowIndex, col: colIndex }}
                onTileClick={onTileClick}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
