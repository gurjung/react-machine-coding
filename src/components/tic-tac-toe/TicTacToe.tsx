import React, { useState, useMemo } from "react";
import "./tictactoe.css";

const TicTacToe = () => {
  const initialBlocksVal: (string | null)[] = Array(9).fill(null);
  const [blocksState, setBlocksState] = useState(initialBlocksVal);
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  //   console.log(blocksState, "blocks");

  const calculateWinner = (currentBoard: (string | null)[]) => {
    for (let i = 0; i < winning_logic.length; i++) {
      const [a, b, c] = winning_logic[i];
      console.log(currentBoard[a], currentBoard[b], currentBoard[c]);
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const winner = useMemo(() => calculateWinner(blocksState), [blocksState]);

  const winning_logic = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBlockClick = (index: number) => {
    if (blocksState[index] || winner) return;

    const clone = [...blocksState];
    clone[index] = isXTurn ? "X" : "O";
    setIsXTurn((prev) => !prev);
    setBlocksState(clone);
  };

  const handleResetGame = () => {
    setBlocksState(initialBlocksVal);
    setIsXTurn(true);
  };

  const getStatusMessage = () => {
    if (winner) return `Player ${winner} win!`;
    if (!blocksState.includes(null)) return "It's a draw";
    return isXTurn ? "Player X turn" : "Player O turn";
  };

  return (
    <main>
      <h2>Tic Tac Toe</h2>
      <span>{getStatusMessage()}</span>
      <div className="blocks-container">
        {blocksState.map((val, index) => {
          return (
            <button
              key={index}
              className="block"
              onClick={() => handleBlockClick(index)}
              disabled={val != null || winner !== null}
            >
              {val}
            </button>
          );
        })}
      </div>
      <button className="reset-btn" onClick={handleResetGame}>
        Reset
      </button>
    </main>
  );
};

export default TicTacToe;
