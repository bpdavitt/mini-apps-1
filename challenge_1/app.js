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

// Check to see if selected square is a valid move
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

//Check to see if square is already occupied or if game is over
const validMove = (id) => {
  return boardData[id] === undefined && boardData.gameOver !== true;    
}

//Upon valid move this function will update the boardData object and appropriate <div>
const handleMove = (id) => {
  const selectedSquare = document.getElementById(id);
  console.log(boardData);
  selectedSquare.textContent = boardData.nextMove;
  boardData[id] = boardData.nextMove;
  //Toggle nextMove betwen 'X' and 'O'
  boardData.toggle();
  boardData.totalMoves ++;
  setStatusText(`Current Move: Player ${boardData.nextMove}`);
  //Don't need to check for wins before move 5
  if (boardData.totalMoves >= 5) {
    if(checkForWin()) {
      console.log('Congratulations, someone won');
      boardData.gameOver = true;
    } else {
      //No winner after 9 moves means game is over, no winner
      if (boardData.totalMoves === 9) {
        setStatusText(`Game Over; Everyone Is A Loser`);
        boardData.gameOver = true;
      }
    }
  }
}

//Checks for all 8 possible win conditions. Utilizes helper to minimize code reuse
const checkForWin = () => {
  if(winCondition(boardData['1a'], boardData['1b'], boardData['1c'])) {
    setStatusText(`Congratulations, Player ${boardData['1a']} Wins!`);
    return true;
  }
  if(winCondition(boardData['2a'], boardData['2b'], boardData['2c'])) {
    setStatusText(`Congratulations, Player ${boardData['2a']} Wins!`);
    return true;
  }
  if(winCondition(boardData['3a'], boardData['3b'], boardData['3c'])) {
    setStatusText(`Congratulations, Player ${boardData['3a']} Wins!`);
    return true;
  }
  if(winCondition(boardData['1a'], boardData['2a'], boardData['3a'])) {
    setStatusText(`Congratulations, Player ${boardData['1a']} Wins!`);
    return true;
  }
  if(winCondition(boardData['1b'], boardData['2b'], boardData['3b'])) {
    setStatusText(`Congratulations, Player ${boardData['1b']} Wins!`);
    return true;
  }
  if(winCondition(boardData['1c'], boardData['2c'], boardData['3c'])) {
    setStatusText(`Congratulations, Player ${boardData['1c']} Wins!`);
    return true;
  }
  if(winCondition(boardData['1a'], boardData['2b'], boardData['3c'])) {
    setStatusText(`Congratulations, Player ${boardData['1a']} Wins!`);
    return true;
  }
  if(winCondition(boardData['3a'], boardData['2b'], boardData['1c'])) {
    setStatusText(`Congratulations, Player ${boardData['3a']} Wins!`);
    return true;
  }
}

// Helper function to determine if a passed-in set of squares are similar
const winCondition = (one, two, three) => {
  return one === two && one === three && one !== undefined;
}