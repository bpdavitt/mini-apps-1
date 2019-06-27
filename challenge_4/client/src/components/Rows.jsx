import React from 'react';
import Square from './Square.jsx';

const Rows = (props) => {

  const rowVals = [0, 1, 2, 3, 4, 5, 6]

  return (
    <div>
      {rowVals.map(currRow => {
        return(
          <Square row={currRow} handleClick={props.handleClick}/>
        )
      })}
    </div>
  )

}

export default Rows;