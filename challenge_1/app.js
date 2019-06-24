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

const handleMove = (id) => {
  const selectedSquare = document.getElementById(id);
  console.log(boardData);
  selectedSquare.textContent = boardData.nextMove;
  boardData.toggle();
  boardData.totalMoves ++;
}