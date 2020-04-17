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
  //Say Hi
  //create an empty board
  createBoard() {
    let board = new Array(6).fill(0).map (() => new Array(7).fill(0));
    this.setState({
      board
    });
  }

  componentDidMount() {
    this.createBoard();
  }

  //First Player chooses their own color
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

  //Players switch turns
  togglePlayer() {
    return (this.state.currentPlayer === 1) ? (this.state.currentPlayer = 2) : (this.state.currentPlayer = 1);
  }

  //Check for a winner
  findVictory(board) {
    //check for a tie
    if (!board[0].includes(0)) {
      return 'tie';
    }
    //check horizontal
    for (let i = 5; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] > 0) {
          if (board[i][j] === board[i][j + 1]
            && board[i][j] === board[i][j + 2]
            && board[i][j] === board[i][j + 3]) {
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
      for (let j = 6; j > 2; j--) {
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
    for (let i = 5; i > 2; i--) {
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

  //Play the game
  startGame(col) {
    let board = this.state.board;
    //if the column is full or the first player did not choose their color, alert the player to try again
    if (board[0][col] !== 0 || !this.state.currentPlayer) {
      this.setState({
        tryAgain: true
      })
    }
    //if there is no winner yet, play the game
    if (!this.state.victory && board[0][col] === 0 && this.state.currentPlayer > 0) {
      for (let row = 5; row >= 0; row--) {
        if (board[row][col] === 0) {
          board[row][col] = this.state.currentPlayer;
          break;
        }
      }
      //assign color to players
      let color = null;
      if (this.state.currentPlayer === 1) {
        color = 'Red ';
      } else {
        color = 'Yellow ';
      }
      //check for a winner
      let victory = this.findVictory(board);

      if (victory === this.state.currentPlayer) {
        this.setState({
          message: `${color} player wins!`,
        })
      } else if (victory === 'tie') {
        this.setState({
          message: 'Tie Game',
          victory: true
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

  //prompt the next player's turn
  alertPlayer() {
    let color = (this.state.currentPlayer === 1) ? 'Red ' : 'Yellow ';
    return this.state.message = `${color} player, click on a column to drop your piece!`
  }

  //if the players want to play again
  playAgain() {
    this.createBoard();
    this.togglePlayer();
    this.alertPlayer();
    this.setState({
      victory: false,
      tryAgain: false
    })
  }

  //if the players do not want to play again
  noThanks() {
    this.setState({
      message: 'Thank you for playing!',
    })
  }

  render() {
    return (
      <div>
        <h2>Connect 4</h2>
        <div></div>
        <div className="message">{this.state.message}</div>
        <div className={`${this.state.tryAgain ? 'try-again' : 'hide-visibility'}`}>Please try again.</div>
        <div className='choose-color'>
          <button onClick={this.chooseColor}
            className={`${this.state.chooseColor ? 'red-piece' : 'hide'}`}
            value='Red '
            type="button"></button>
          <button onClick={this.chooseColor}
            className={`${this.state.chooseColor ? 'yellow-piece' : 'hide'}`}
            value='Yellow '
            type="button"></button>
            <div className={`${this.state.chooseColor ? 'hide' : this.state.victory ? 'hide' : (this.state.currentPlayer === 1) ? 'red-piece' : 'yellow-piece'}`}></div>
        </div>
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            {this.state.board.map((row, index) => (
              <Row key={index} row={row} startGame={this.startGame} />
            ))}
          </tbody>
        </table>
        <div className={`${this.state.victory ? 'victory' : 'hide'}`}>
          <h4>Do you want to play again?</h4>
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