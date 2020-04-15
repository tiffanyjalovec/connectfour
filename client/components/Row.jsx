import React from 'react';
import Square from './Square.jsx';

const Row = ({row}) => {
  return(
    <tr>
      {row.map((square, index) =>
      <Square key={index} value={square} column={index} />
      )}
    </tr>
  );
};

export default Row;