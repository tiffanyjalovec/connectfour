import React from 'react';
import Square from './Square.jsx';

const Row = ({ row, startGame, currentPlayer }) => {
  return(
    <tr>
      {row.map((square, index) =>
      <Square key={index} value={square} column={index} startGame={startGame} />
      )}
    </tr>
  );
};

export default Row;