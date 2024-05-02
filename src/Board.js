import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 25.0}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++){
      //create a new row
      let row = [];
      for (let j = 0; j < ncols; j++){
        //create a random num to determine if the light starts on
        const rand = Math.random() * 100;
        const isLit = rand < chanceLightStartsOn;
        row.push(isLit);
      }
      initialBoard.push(row);
    }
    
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let row = 0; row < nrows; row++){
      for (let col = 0; col < ncols; col++){
        if (board[row][col]){
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => [...row]);

      const flipCell = (y, x, boardCopy) => {
        console.log("x:", x, "y:", y, "ncols:", ncols, "nrows:", nrows);
        // if this coord is actually on board, flip it
        try{
          if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
            boardCopy[y][x] = !boardCopy[y][x];
          }
        }
        catch{
          console.log("cell doesnt exist");
        }
      };

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);

      flipCell(y - 1, x, newBoard); // Up
      flipCell(y + 1, x, newBoard); // Down
      flipCell(y, x - 1, newBoard); // Left
      flipCell(y, x + 1, newBoard); // Right

      // TODO: return the copy
      return newBoard;

    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>Congratulations! You've won!</div>;
  }

  // make table board
  const tableBoard = [];
  for (let row = 0; row < nrows; row++) {
    let cells = [];
    for (let col = 0; col < ncols; col++) {
      const coord = `${row}-${col}`;
      cells.push(
        <Cell
          key={coord}
          isLit={board[row][col]}
          flipCellsAround={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr key={row}>{cells}</tr>);
  }

  // Return the rendered board
  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
