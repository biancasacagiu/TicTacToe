import React, {useState} from 'react'
import Board from './Board'
import calculateWinner from './calculateWinner'

function Game(props) {
    const [history, setHistory] = useState([
      {
        squares: Array(9).fill(null)
      }
    ]);
    const[stepNumber, setStepNumber] = useState(0);
    const[xIsNext, setXIsNext] = useState(true);
  
    const handleClick = (i) => {
     // const history = this.state.history.slice(0, this.state.stepNumber + 1);
      setHistory(history.slice(0, stepNumber + 1));
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      console.log(history);
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? "X" : "O";
      // this.setState({
      //   history: history.concat([
      //     {
      //       squares: squares
      //     }
      //   ]),
      //   stepNumber: history.length,
      //   xIsNext: !this.state.xIsNext
      // });

      setHistory(history.concat([
        {
          squares: squares
        }
      ]));
      setStepNumber(history.length);
      setXIsNext(!xIsNext)
    }
  
   const jumpTo = (step) => {
      // this.setState({
      //   stepNumber: step,
      //   xIsNext: (step % 2) === 0
      // });
      setStepNumber(step);
      setXIsNext((step % 2) === 0);
    }
  
      const current = history[stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
  }
  

export default Game