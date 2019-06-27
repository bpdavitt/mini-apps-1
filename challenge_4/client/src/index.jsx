import React from 'react';
import ReactDOM from 'react-dom';
import Gameboard from './components/Gameboard.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      board: [
        [null, null, null, null, null, null, null], //0
        [null, null, null, null, null, null, null], //1
        [null, null, null, null, null, null, null], //2
        [null, null, null, null, null, null, null], //3
        [null, null, null, null, null, null, null], //4
        [null, null, null, null, null, null, null], //5
        [null, null, null, null, null, null, null] //6
      ]
    }
  }

  render() {
    return (
      <div>
        <Gameboard />
      </div>
    )
  }
}

// ReactDOM.render(<h1>Hello Connect Four World</h1>, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));