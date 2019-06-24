console.log('Initial setup');

const boardData = {
  nextMove: 'X',
  toggle: () => {
    if (boardData.nextMove === 'X') {
      boardData.nextMove = 'O';
    } else {
      boardData.nextMove = 'X';
    }
  },
  totalMoves: 0
};

window.onload = function () {
  document.getElementById('game-status').textContent = `Current Move: Player ${boardData.nextMove}`;
  boxes = document.getElementsByClassName('square');
  // Add event listener for every box
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', (event) => {
      event.preventDefault();
      //Access the id for the box that was clicked
      console.log(event.target.id);
      handleClick(event.target.id);
    });
  }
}

// Check to see if this spot has already been 'taken'
const handleClick = (id) => {
  if (validMove(id)) {
    handleMove(id);
  } else {
    console.log('Spot taken, do better')
  }
}

const validMove = (id) => {
  return boardData[id] === undefined;    
}

//Upon valid move this function will update the boardData object and appropriate <div>
const handleMove = (id) => {
  const selectedSquare = document.getElementById(id);
  console.log(boardData);
  selectedSquare.textContent = boardData.nextMove;
  boardData[id] = boardData.nextMove;
  boardData.toggle();
  boardData.totalMoves ++;
  document.getElementById('game-status').textContent = `Current Move: Player ${boardData.nextMove}`;
  if (boardData.totalMoves >= 5) {
    if(checkForWin()) {
      console.log('Congratulations, someone won');
    } else {
      if (boardData.totalMoves === 9) {
        document.getElementById('game-status').textContent = `Game Over; Everyone Is A Loser`;
      }
    }
  }
}

const checkForWin = () => {
  if(boardData['1a'] === boardData['1b'] === boardData['1c']) {
    document.getElementById('game-status').textContent = `Congratulations, Player ${boardData['1a']} Wins!`;
    return;
  }
  if(boardData['2a'] === boardData['2b'] === boardData['2c']) {
    document.getElementById('game-status').textContent = `Congratulations, Player ${boardData['2a']} Wins!`;
    return;
  }
  if(boardData['3a'] === boardData['3b'] === boardData['3c']) {
    document.getElementById('game-status').textContent = `Congratulations, Player ${boardData['3a']} Wins!`;
    return;
  }
  if(boardData['1a'] === boardData['2a'] === boardData['3a']) {
    document.getElementById('game-status').textContent = `Congratulations, Player ${boardData['1a']} Wins!`;
    return;
  }
  if(boardData['1b'] === boardData['2b'] === boardData['3b']) {
    document.getElementById('game-status').textContent = `Congratulations, Player ${boardData['1a']} Wins!`;
    return;
  }
  if(boardData['1c'] === boardData['2c'] === boardData['3c']) {
    document.getElementById('game-status').textContent = `Congratulations, Player ${boardData['1a']} Wins!`;
    return;
  }
  if(boardData['1a'] === boardData['2b'] === boardData['3c']) {
    document.getElementById('game-status').textContent = `Congratulations, Player ${boardData['1a']} Wins!`;
    return;
  }
  if(boardData['3a'] === boardData['2b'] === boardData['1c']) {
    document.getElementById('game-status').textContent = `Congratulations, Player ${boardData['1a']} Wins!`;
    return;
  }
}