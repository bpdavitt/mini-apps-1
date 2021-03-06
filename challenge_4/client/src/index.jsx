import React from 'react';
import ReactDOM from 'react-dom';
import Gameboard from './components/Gameboard.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0], //0
        [0, 0, 0, 0, 0, 0, 0], //1
        [0, 0, 0, 0, 0, 0, 0], //2
        [0, 0, 0, 0, 0, 0, 0], //3
        [0, 0, 0, 0, 0, 0, 0], //4
        [0, 0, 0, 0, 0, 0, 0], //5
        [0, 0, 0, 0, 0, 0, 0] //6
      ],
      currentPlayer: 'X'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(event.target)
    this.checkValidity(event.target.id);
  }

  checkValidity(location) {
    const row = Number(location[0]);
    const col = Number(location[1]);
    console.log(`row: ${row} \n col: ${col}`)
    for (let i = 6; i >= row; i--) {
      if(this.state.board[i][col] === 0) {
        this.placePiece(i, col);
        break;
      }
    }
  }

  placePiece(row, col) {
    const squareId = '' + row + col;
    console.log(squareId);
    document.getElementById(squareId).textContent = this.state.currentPlayer;
    const currBoard = this.state.board.slice(0);
    currBoard[row][col] = this.state.currentPlayer === 'X' ? 1 : 2;
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    console.log(currBoard);
    this.checkWin(row, col, currBoard, this.state.currentPlayer);
    this.setState({board: currBoard, currentPlayer: nextPlayer});
  }

  checkWin(row, col, board, player) {
    let boardStr = '';
    for (let i = 0; i < board.length; i++) {
      boardStr += board[i].join('');
    }
    console.log(boardStr);
    axios.get('http://kevinalbs.com/connect4/back-end/index.php/hasWon', {
      params: {
        board_data: boardStr,
        i: row,
        j: col
      }
    })
      .then((response) => {
        console.log(response.data);
        if(response.data === true) {
          alert(`Game Over, Player: ${player} has won!`);
          axios.post('/games', {
            gameboard: boardStr,
            winner: player
          })
        }
      })
      .catch(() => {
        console.log('Win-Check request failed')
      })
  }

  render() {
    return (
      <div>
        <Gameboard handleClick={this.handleClick}/>
      </div>
    )
  }
}

// ReactDOM.render(<h1>Hello Connect Four World</h1>, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));