import React, { useState } from 'react';
import './TicTacToe.css';

// PUBLIC_INTERFACE
const TicTacToe = () => {
  // Initialize state for board, current player, and game status
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('ongoing');

  /**
   * Check for winning combinations
   * @param {Array} squares - Current state of the board
   * @returns {string|null} - Winning player ('X' or 'O') or null if no winner
   */
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  /**
   * Handle cell click event
   * @param {number} index - Index of the clicked cell
   */
  const handleClick = (index) => {
    // Return if cell is filled or game is over
    if (board[index] || gameStatus !== 'ongoing') return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    // Check for winner
    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameStatus(`winner-${winner}`);
      return;
    }

    // Check for draw
    if (!newBoard.includes(null)) {
      setGameStatus('draw');
      return;
    }

    setIsXNext(!isXNext);
  };

  /**
   * Reset the game to initial state
   */
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('ongoing');
  };

  // Generate status message based on game state
  const getStatusMessage = () => {
    if (gameStatus.startsWith('winner')) {
      const winner = gameStatus.split('-')[1];
      return `Winner: Player ${winner}`;
    }
    if (gameStatus === 'draw') {
      return 'Game Draw!';
    }
    return `Next Player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="tic-tac-toe">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="game-info">{getStatusMessage()}</div>
      
      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? 'filled' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="btn restart-btn" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
