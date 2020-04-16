import React from 'react';
import Row from './Row.jsx';
import '../../public/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      currentPlayer: null,
      victory: false,
      chooseColor: true,
      message: 'First player, click on the color of your choice:',
      tryAgain: false
    }
    this.chooseColor = this.chooseColor.bind(this);
    this.startGame = this.startGame.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.noThanks = this.noThanks.bind(this);
  }

  createBoard() {
    let board = [];
    for (var i = 0; i < 6; i++) {
      let row = [];
      for (var j = 0; j < 7; j++) {
        row.push(0);
      }
      board.push(row);
    }
    this.setState({
      board
    });
  }

  componentDidMount() {
    this.createBoard();
  }

  chooseColor(e) {
    e.preventDefault();
    if (e.target.value === 'Red ') {
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
      message: `${e.target.value} player, click on a column to drop your piece!`,
      tryAgain: false
    });
  }

  togglePlayer() {
    return (this.state.currentPlayer === 1) ? (this.state.currentPlayer = 2) : (this.state.currentPlayer = 1);
  }

  findVictory(board) {
    //check horizontal
    for (let i = 5; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] > 0) {
          if (board[i][j] === board[i][j + 1]
            && board[i][j] === board[i][j + 2]
            && board[i][j] === board[i][j + 3]) {
            console.log('victory!');
            this.setState({
              victory: true
            });
            return board[i][j];
          }
        }
      }
    }

    //check vertical
    for (let i = 2; i >= 0; i--) {
      for (let j = 0; j < 7; j++) {
        if (board[i][j] > 0) {
          if (board[i][j] === board[i + 1][j]
            && board[i][j] === board[i + 2][j]
            && board[i][j] === board[i + 3][j]) {
            console.log('victory!');
            this.setState({
              victory: true
            });
            return board[i][j];
          }
        }
      }
    }

    //check major diagonal (bottom-right to top-left)
    for (let i = 5; i > 2; i--) {
      for (let j = 6; j > 4; j--) {
        if (board[i][j] > 0) {
          if (board[i][j] === board[i - 1][j - 1]
            && board[i][j] === board[i - 2][j - 2]
            && board[i][j] === board[i - 3][j - 3]) {
            this.setState({
              victory: true
            });
            return board[i][j];
          }
        }
      }
    }

    //check minor diagonal (bottom-left to top-right)
    for (let i = 5; i >= 2; i--) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] > 0) {
          if (board[i][j] === board[i - 1][j + 1]
            && board[i][j] === board[i - 2][j + 2]
            && board[i][j] === board[i - 3][j + 3]) {
            this.setState({
              victory: true
            });
            return board[i][j];
          }
        }
      }
    }

  }


  startGame(col) {
    let board = this.state.board;
    if (board[0][col] !== 0 || !this.state.currentPlayer) {
      this.setState({
        tryAgain: true
      })
    }
    if (!this.state.victory && board[0][col] === 0 && this.state.currentPlayer > 0) {
        for (let row = 5; row >= 0; row--) {
          if (board[row][col] === 0) {
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

        let victory = this.findVictory(board);

        if (victory === this.state.currentPlayer) {
          this.setState({
            message: `${color} player wins!`,
          })
        } else {
          this.setState({
            board,
            currentPlayer: this.togglePlayer(),
            message: this.alertPlayer(),
            tryAgain: false
          });
        }
      }
  }

  alertPlayer() {
    let color = (this.state.currentPlayer === 1) ? 'Red ' : 'Yellow ';
    return this.state.message = `${color} player, click on a column to drop your piece!`
  }

  playAgain() {
    this.createBoard();
    this.togglePlayer();
    this.alertPlayer();
    this.setState({
      victory: false,
      tryAgain: false
    })
  }

  noThanks() {
    this.setState({
      message: 'Thank you for playing!',
    })
  }

  render() {
    return (
      <div>
        <h3>Connect 4</h3>
        <div></div>
        <h4 className="message">{this.state.message}</h4>
        <h4 className={`${this.state.tryAgain ? 'try-again' : 'hide'}`}>Please try again.</h4>
        <div className={`${this.state.chooseColor ? 'choose-color' : 'hide-choice'}`}>
          <button onClick={this.chooseColor}
            className="red-piece"
            value='Red '
            type="button"></button>
          <button onClick={this.chooseColor}
            className="yellow-piece"
            value='Yellow '
            type="button"></button>
        </div>
        <table>
          <tbody>
            {this.state.board.map((row, index) => (
              <Row key={index} row={row} startGame={this.startGame} />
            ))}
          </tbody>
        </table>
        <div className={`${this.state.victory ? 'victory' : 'hide'}`}>
          <h4>Would you like to play again?</h4>
          <button onClick={this.playAgain}
            className="play-again"
            type="button">
            YES
          </button>
          <button onClick={this.noThanks}
            className="no-thanks"
            type="button">
            No Thanks
          </button>
        </div>
      </div>
    );
  }
}

export default App;