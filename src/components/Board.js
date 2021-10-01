import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    var classBtn = "";
    if (i === this.props.move) {
      classBtn = "bold";
    }

    if (this.props.winners) {
      if (this.props.winners.includes(i)) {
        classBtn += " winner";
      }
    }

    return (
      <Square
        classBtn={classBtn}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    var rows = [];
    for (var i = 0; i < 3; i++) {
      var cols = [];
      for (var j = 0; j < 3; j++) {
        cols.push(<span key={j + i * 3}>{this.renderSquare(i * 3 + j)}</span>);
      }
      rows.push(
        <div key={i} className="board-row">
          {cols}
        </div>
      );
    }

    return <div>{rows}</div>;
  }
}

export default Board;
