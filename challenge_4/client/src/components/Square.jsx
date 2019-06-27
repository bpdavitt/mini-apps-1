import React from 'react';

const Square = (props) => {
  const colVals = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div class="row">
      {colVals.map(currCol => {
        return (
          <div class="square" id={'' + props.row + currCol} />
        )
      })}
    </div>
  )
}

export default Square;