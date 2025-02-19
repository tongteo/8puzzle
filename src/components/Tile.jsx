import React from 'react';
import './Tile.css';

function Tile({ value, position, onTileClick }) {
  const handleClick = () => {
    if (value !== 0) {
      onTileClick(position);
    }
  };

  return (
    <div className={`tile ${value === 0 ? 'blank' : ''}`} onClick={handleClick}>
      {value !== 0 && value}
    </div>
  );
}

export default Tile;
