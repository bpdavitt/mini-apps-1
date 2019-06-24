console.log('Initial setup');

//Data to hold information about board
const gameData = {
  nextMove: 'X',
  gameOver: false,
  toggle: () => {
    if (gameData.nextMove === 'X') {
      gameData.nextMove = 'O';
    } else {
      gameData.nextMove = 'X';
    }
  },
  totalMoves: 0,
  xWins: 0,
  oWins: 0
};

window.onload = function () {
  gameData['playerX'] = prompt('Please enter a name for Player 1 (will be X\'s)', 'Enter name');
  gameData['playerO'] = prompt('Please enter a name for Player 2 (will be O\'s)', 'Enter name');
  setStatusText(`Current Move: ${nextPlayer()}`);
  setStatusText(`Wins for ${gameData.playerX}: ${gameData.xWins}`, 'x-wins')
  setStatusText(`Wins for ${gameData.playerO}: ${gameData.oWins}`, 'o-wins')
  const boxes = document.getElementsByClassName('square');
  // Add event listener for every box
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', (event) => {
      event.preventDefault();
      //Access the id for the box that was clicked
      console.log(event.target.id);
      handleClick(event.target.id);
    });
  }
  const resetBtn = document.getElementById('reset');
  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Reset button clicked');
    resetGame();
  });
}

//Returns the name of the next player
const nextPlayer = () => {
  if (gameData.nextMove === 'X') {
    return gameData.playerX + ' (X\'s)'
  } else {
    return gameData.playerO + ' (O\'s)';
  }
}

//Sets text of a given HTML element by id; defaults to game-status
const setStatusText = (string, id = 'game-status') => {
  document.getElementById(id).textContent = (string);
}

// Check to see if selected square is a valid move
const handleClick = (id) => {
  if (validMove(id)) {
    handleMove(id);
  } else {
    if(gameData.gameOver === true) {
      console.log('Game is over, start a new game')
      setStatusText('Game Is Over, Please Start New Game');
    } else {
      console.log('Spot taken, do better')
      setStatusText(`Current Move: ${nextPlayer()}: Please pick a square that has not been selected`);
    }
  }
}

//Check to see if square is already occupied or if game is over
const validMove = (id) => {
  return gameData[id] === undefined && gameData.gameOver !== true;    
}

//Upon valid move this function will update the gameData object and appropriate <div>
const handleMove = (id) => {
  const selectedSquare = document.getElementById(id);
  console.log(gameData);
  selectedSquare.textContent = gameData.nextMove;
  gameData[id] = gameData.nextMove;
  if (gameData.nextMove === 'X') {
    selectedSquare.className += ' x';
  } else {
    selectedSquare.className += ' o';
  }
  //Toggle nextMove betwen 'X' and 'O'
  gameData.toggle();
  gameData.totalMoves ++;
  setStatusText(`Current Move: ${nextPlayer()}`);
  //Don't need to check for wins before move 5
  if (gameData.totalMoves >= 5) {
    if(checkForWin()) {
      console.log('Congratulations, someone won');
      gameData.gameOver = true;
    } else {
      //No winner after 9 moves means game is over, no winner
      if (gameData.totalMoves === 9) {
        setStatusText(`Game Over; Everyone Is A Loser`);
        gameData.gameOver = true;
      }
    }
  }
}

//Checks for all 8 possible win conditions. Utilizes helper to minimize code reuse
const checkForWin = () => {
  if(winCondition(gameData['1a'], gameData['1b'], gameData['1c'])) {
    return true;
  }
  if(winCondition(gameData['2a'], gameData['2b'], gameData['2c'])) {
    return true;
  }
  if(winCondition(gameData['3a'], gameData['3b'], gameData['3c'])) {
    return true;
  }
  if(winCondition(gameData['1a'], gameData['2a'], gameData['3a'])) {
    return true;
  }
  if(winCondition(gameData['1b'], gameData['2b'], gameData['3b'])) {
    return true;
  }
  if(winCondition(gameData['1c'], gameData['2c'], gameData['3c'])) {
    return true;
  }
  if(winCondition(gameData['1a'], gameData['2b'], gameData['3c'])) {
    return true;
  }
  if(winCondition(gameData['3a'], gameData['2b'], gameData['1c'])) {
    return true;
  }
}

// Helper function to determine if a passed-in set of squares are similar
// If arguments represent a win condition will handle win
const winCondition = (one, two, three) => {
  if (one === two && one === three && one !== undefined) {
    handleWin(one);
    return true;
  } else {
    return false;
  }
}

const handleWin = (winner) => {
  gameData.nextMove = winner;
  setStatusText(`Congratulations, ${nextPlayer()} Wins!`);
  if (winner === 'X') {
    gameData.xWins ++;
    setStatusText(`Wins for ${gameData.playerX}: ${gameData.xWins}`, 'x-wins')
  } else {
    gameData.oWins ++;
    setStatusText(`Wins for ${gameData.playerO}: ${gameData.oWins}`, 'o-wins')
  }
}

const resetGame = () => {
  const boxes = document.getElementsByClassName('square');
  console.log(boxes);
  for (let i = 0; i < boxes.length; i++) {
    const id = boxes[i].id;
    boxes[i].textContent = '';
    boxes[i].className = 'square';
    gameData[id] = undefined;
  }
  gameData.totalMoves = 0;
  gameData.gameOver = false;
  setStatusText(`Current Move: ${nextPlayer()}`);

}