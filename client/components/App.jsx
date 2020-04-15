import React from 'react';
import Row from './Row.jsx';
import '../../public/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      currentPlayer: null,
      player1: '',
      player2: '',
      gameOver: false,
      chooseColor: true
    }
    this.chooseColor = this.chooseColor.bind(this);
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
    console.log(e.target.value);
    this.setState({
      player1: e.target.value,
      chooseColor: false,
      message: `${e.target.value} player, click on a column to drop your piece!`
    });
    (this.state.player1 === 'red') ? this.state.player2 = 'yellow' : this.state.player2 = 'red';
  }



  render() {
    console.log(`${this.state.player2} player, click on the solumn to drop your piece`);
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
              <Row key={index} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;