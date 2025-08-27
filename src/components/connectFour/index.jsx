import "./style.css"
import React from 'react';
import { useReducer } from "react";
const COL_NUM = 7;
const ROW_NUM = 6;
const NUM_TO_WIN = 4;

export default function ConnectFour() {
  // Write your code here.
  const [{ board, winner, isGameOver }, dispatch] = useReducer(
    reducer,
    genEmptyState()
  );

  return (
    <>
      {winner != null && <h1>Player {winner} Wins</h1>}
      <div className="board">
        {board.map((colEntries, colIndex) => {
          const handleClickCol = () => {
            dispatch({ type: "move", colIndex });
          };
          return (
            <Column
              key={colIndex}
              entries={colEntries}
              onClick={handleClickCol}
            />
          );
        })}
      </div>

      {isGameOver && (
        <button
          onClick={() => {
            dispatch({ type: "restart" });
          }}
        >
          Restart
        </button>
      )}
    </>
  );
}

function Column({ entries, onClick }) {
  return (
    <div className="column" onClick={onClick}>
      {entries.map((entry, rowIndex) => {
        return (
          <div key={rowIndex} className="tile">
            {entry != null && <div className={`player player-${entry}`} />}
          </div>
        );
      })}
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "restart":
      return genEmptyState();
    case "move":
      const relevantCol = state.board[action.colIndex];
      const colIsFull = relevantCol[0] != null;
      if (state.isGameOver || colIsFull) return state;

      const { board, currentPlayer } = state;
      const boardClone = [...board];
      const colClone = [...relevantCol];
      const rowIndex = colClone.lastIndexOf(null);
      colClone[rowIndex] = currentPlayer;
      boardClone[action.colIndex] = colClone;

      //judge who wins
      const didWinVertical = didWin(
        rowIndex,
        action.colIndex,
        0,
        1,
        currentPlayer,
        boardClone
      );
      const didWinHorizontal = didWin(
        rowIndex,
        action.colIndex,
        1,
        0,
        currentPlayer,
        boardClone
      );
      const didWinDiagonal = didWin(
        rowIndex,
        action.colIndex,
        1,
        1,
        currentPlayer,
        boardClone
      ) || didWin(
        rowIndex,
        action.colIndex,
        -1,
        1,
        currentPlayer,
        boardClone
      );
      const winner =
        didWinVertical || didWinHorizontal || didWinDiagonal
          ? currentPlayer
          : null;
      const isBoardFull = boardClone.every((col) =>
        col.every((value) => value != null)
      );

      return {
        board: boardClone,
        currentPlayer: currentPlayer === 1 ? 2 : 1,
        winner,
        isGameOver: winner != null || isBoardFull,
      };
    default:
      throw new Error("Unexpected action type");
  }
}

function genEmptyState() {
  return {
    board: Array(COL_NUM)
      .fill(null)
      .map(() => Array(ROW_NUM).fill(null)),
    currentPlayer: 1,
    winner: null,
    isGameOver: false,
  };
}

function didWin(
  startRow,
  startCol,
  rowIncrement,
  colIncrement,
  currentPlayer,
  board
) {
  let count = 0;
  let row = startRow;
  let col = startCol;

  while (row < ROW_NUM && col < COL_NUM && board[col][row] === currentPlayer) {
    count++;
    //move one direction
    row += rowIncrement;
    col += colIncrement;
  }
  row = startRow - rowIncrement;
  col = startCol - colIncrement;

  while (row >= 0 && col >= 0 && board[col][row] === currentPlayer) {
    count++;
    //move the other direction
    row -= rowIncrement;
    col -= colIncrement;
  }

  return count >= NUM_TO_WIN;
}
