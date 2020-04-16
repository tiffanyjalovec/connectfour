import React from 'react';

const Square = ({ value, column, startGame }) => {
  let piece = 'begin';
  if (value === 1) {
    piece = 'red-piece';
  } else if (value === 2) {
    piece = 'yellow-piece';
  }

  return (
    <td>
      <div className="square" onClick={() => {startGame(column)}}>
      <div className={piece}></div>
      </div>
    </td>
  )
};

export default Square;