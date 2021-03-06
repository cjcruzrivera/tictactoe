import React from "react";
import Board from "./Board";
import { BiArrowFromBottom, BiArrowFromTop } from "react-icons/bi";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          move_location: null,
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      order: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
          move_location: i,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  moves(history) {
    if (!this.state.order) {
      history = history.reverse();
      const size = history.length;
      var reversed = [];
      for (let i = size - 1; i >= 0; i--) {
        reversed.push(i);
      }
    }
    const moves = history.map((step, move) => {
      if (!this.state.order) {
        move = reversed[move];
      }

      const move_sign = step.squares[step.move_location];
      const desc = move
        ? "Go to move #" +
          move +
          ". " +
          move_sign +
          " at " +
          getLocation(step.move_location)
        : "Go to game start";

      const className =
        move === this.state.stepNumber
          ? "buttons_history bold"
          : "buttons_history";
      return (
        <li key={move}>
          <button className={className} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    return moves;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    var history_moves = history.slice();
    let status;
    let winners;
    if (winner) {
      status = "Winner: " + winner.winner;
      winners = winner.line;
    } else {
      if (this.state.stepNumber === 9) {
        status = "Draw";
      } else {
        status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
      }
    }

    const icon = this.state.order ? <BiArrowFromTop /> : <BiArrowFromBottom />;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winners={winners}
            squares={current.squares}
            move={current.move_location}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            {" "}
            <button
              className="buttons_history mt-20"
              onClick={() => {
                this.setState({ order: !this.state.order });
              }}
            >
              Order: {icon}
            </button>
          </div>
          <ol reversed={!this.state.order} className="mt-20">
            {this.moves(history_moves)}
          </ol>
        </div>
      </div>
    );
  }
}

function getLocation(move_location) {
  const x = (move_location % 3) + 1;
  const y = Math.floor(move_location / 3) + 1;
  return "(" + x + ", " + y + ")";
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  return null;
}

export default Game;
