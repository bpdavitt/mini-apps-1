import React from 'react';
import Rows from './Rows.jsx';

const Gameboard = (props) => {
  return (
    <div class="gameboard">
      <Rows handleClick={props.handleClick}/>
    </div>
  )
}

export default Gameboard;