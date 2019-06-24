console.log('Initial setup');

//Data to hold information about board
const boardData = {
  nextMove: 'X',
  gameOver: false,
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
  setStatusText(`Current Move: Player ${boardData.nextMove}`);
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

//Sets text in game status <div>
const setStatusText = (string) => {
  document.getElementById('game-status').textContent = (string);
}

// Check to see if selected square is a) valid move
const handleClick = (id) => {
  if (validMove(id)) {
    handleMove(id);
  } else {
    if(boardData.gameOver === true) {
      console.log('Game is over, start a new game')
      setStatusText('Game Is Over, Please Start New Game');
    } else {
      console.log('Spot taken, do better')
      setStatusText(`Current Move: Player ${boardData.nextMove}: Please pick a square that has not been selected`);
    }
  }
}

const validMove = (id) => {
  return boardData[id] === undefined && boardData.gameOver !== true;    
}

//Upon valid move this function will update the boardData object and appropriate <div>
const handleMove = (id) => {
  const selectedSquare = document.getElementById(id);
  console.log(boardData);
  selectedSquare.textContent = boardData.nextMove;
  boardData[id] = boardData.nextMove;
  boardData.toggle();
  boardData.totalMoves ++;
  setStatusText(`Current Move: Player ${boardData.nextMove}`);
  if (boardData.totalMoves >= 5) {
    if(checkForWin()) {
      console.log('Congratulations, someone won');
      boardData.gameOver = true;
    } else {
      if (boardData.totalMoves === 9) {
        setStatusText(`Game Over; Everyone Is A Loser`);
        boardData.gameOver = true;
      }
    }
  }
}

const checkForWin = () => {
  if(boardData['1a'] === boardData['1b'] && boardData['1a'] === boardData['1c'] && boardData['1a'] !== undefined) {
    setStatusText(`Congratulations, Player ${boardData['1a']} Wins!`);
    return true;
  }
  if(boardData['2a'] === boardData['2b'] && boardData['2a'] === boardData['2c'] && boardData['2a'] !== undefined) {
    setStatusText(`Congratulations, Player ${boardData['2a']} Wins!`);
    return true;
  }
  if(boardData['3a'] === boardData['3b'] && boardData['3a'] === boardData['3c'] && boardData['3a'] !== undefined) {
    setStatusText(`Congratulations, Player ${boardData['3a']} Wins!`);
    return true;
  }
  if(boardData['1a'] === boardData['2a'] && boardData['1a'] === boardData['3a'] && boardData['1a'] !== undefined) {
    setStatusText(`Congratulations, Player ${boardData['1a']} Wins!`);
    return true;
  }
  if(boardData['1b'] === boardData['2b'] && boardData['1b'] === boardData['3b'] && boardData['1b'] !== undefined) {
    setStatusText(`Congratulations, Player ${boardData['1b']} Wins!`);
    return true;
  }
  if(boardData['1c'] === boardData['2c'] && boardData['1c'] === boardData['3c'] && boardData['1c'] !== undefined) {
    setStatusText(`Congratulations, Player ${boardData['1c']} Wins!`);
    return true;
  }
  if(boardData['1a'] === boardData['2b'] && boardData['1a'] === boardData['3c'] && boardData['1a'] !== undefined) {
    setStatusText(`Congratulations, Player ${boardData['1a']} Wins!`);
    return true;
  }
  if(boardData['3a'] === boardData['2b'] && boardData['3a'] === boardData['1c'] && boardData['3a'] !== undefined) {
    setStatusText(`Congratulations, Player ${boardData['3a']} Wins!`);
    return true;
  }
}