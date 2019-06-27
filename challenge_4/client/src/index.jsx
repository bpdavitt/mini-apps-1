import React from 'react';
import ReactDOM from 'react-dom';
import Gameboard from './components/Gameboard.jsx';

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