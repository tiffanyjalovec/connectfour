import React from 'react';
import Row from './Row.jsx';
import '../../public/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      currentPlayer: null,
      gameOver: false,
      chooseColor: true
    }
    this.chooseColor = this.chooseColor.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  createBoard() {
    let board = [];
    for (var i = 0; i < 6; i ++) {
      let row = [];
      for (var j = 0; j < 7; j++) {
        row.push(0);
      }
      board.push(row);
    }
    this.setState({
      board,
      message: 'First player, click on the color of your choice:'
    });
  }

  componentDidMount() {
    this.createBoard();
  }

  chooseColor(e) {
    e.preventDefault();
    if (e.target.value === 'red') {
      this.setState({
        currentPlayer: 1
      })
    } else {
      this.setState({
        currentPlayer: 2
      })
    }
    this.setState({
      chooseColor: false,
      message: `${e.target.value} player, click on a column to drop your piece!`
    });
  }

  togglePlayer() {
    return (this.state.currentPlayer === 1) ? (this.state.currentPlayer = 2) : (this.state.currentPlayer = 1);
  }

  startGame(col) {
    let board = this.state.board;
    for (let row = 5; row >= 0; row--) {
      if ( board[row][col] === 0 ) {
        board[row][col] = this.state.currentPlayer;
        break;
      }
    }
    let color = null;
    if (this.state.currentPlayer === 1) {
      color = 'Red ';
    } else {
      color = 'Yellow ';
    }
    this.setState({
      board,
      currentPlayer: this.togglePlayer(),
      message: `${color} player, click on a column to drop your piece!`
    });
  }


  render() {
    return (
      <div>
        <h3>Connect 4</h3>
        <div></div>
        <h4 className="message">{this.state.message}</h4>
        <div className={`${this.state.chooseColor ? 'choose-color' : 'hide-choice'}`}>
          <button onClick={this.chooseColor}
          className="red-piece"
          value="Red"
          type="button"></button>
          <button onClick={this.chooseColor}
          className="yellow-piece"
          value="Yellow"
          type="button"></button>
        </div>
        <table>
          <tbody>
            {this.state.board.map((row, index) => (
              <Row key={index} row={row} startGame={this.startGame} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;