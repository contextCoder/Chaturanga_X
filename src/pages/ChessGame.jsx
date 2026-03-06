import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Clock from "../components/Clock";
import "./ChessGame.css";

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [whitePlayerName, setWhitePlayerName] = useState("Guest (White)");
  const [blackPlayerName, setBlackPlayerName] = useState("Guest (Black)");
  const [whiteTimeLeft, setWhiteTimeLeft] = useState(300);
  const [blackTimeLeft, setBlackTimeLeft] = useState(300);
  const [gameStarted, setGameStarted] = useState(false);
  const [editingWhite, setEditingWhite] = useState(false);
  const [editingBlack, setEditingBlack] = useState(false);
  const [tempWhiteName, setTempWhiteName] = useState(whitePlayerName);
  const [tempBlackName, setTempBlackName] = useState(blackPlayerName);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);

  const isWhiteTurn = game.turn() === "w";

  // TIMER
  useEffect(() => {
    if (!gameStarted || game.isGameOver()) return;

    const interval = setInterval(() => {
      if (isWhiteTurn) {
        setWhiteTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setBlackTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, isWhiteTurn, game]);

  // MOVE LOGIC
  const makeMove = (from, to) => {
    const newGame = new Chess(game.fen());

    const move = newGame.move({
      from,
      to,
      promotion: "q",
    });

    if (!move) return false;

    setGame(newGame);
    return true;
  };

  // DRAG & DROP
  const handlePieceDrop = (sourceSquare, targetSquare) => {
    const moveMade = makeMove(sourceSquare, targetSquare);

    if (moveMade) {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }

    return moveMade;
  };

  // CLICK TO MOVE
  const handleSquareClick = (square) => {
    if (!selectedSquare) {
      const piece = game.get(square);
      if (!piece) return;

      if (
        (isWhiteTurn && piece.color === "w") ||
        (!isWhiteTurn && piece.color === "b")
      ) {
        setSelectedSquare(square);

        const moves = game.moves({ square, verbose: true });
        setPossibleMoves(moves.map((m) => m.to));
      }
      return;
    }

    if (square === selectedSquare) {
      setSelectedSquare(null);
      setPossibleMoves([]);
      return;
    }

    const moveMade = makeMove(selectedSquare, square);
    if (moveMade) {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setSelectedSquare(null);
    setPossibleMoves([]);
    setGameStarted(false);
    setWhiteTimeLeft(300);
    setBlackTimeLeft(300);
  };

  return (
    <div className="chess-game-container">
      <div className="chess-game">
        <div className="control-panel">

          {game.isGameOver() && <div className="game-over">Game Over!</div>}

          <div className="button-group">
            <button onClick={resetGame}>Reset</button>
          </div>
        </div>

          <Clock
            initialTime={blackTimeLeft}
            isActive={gameStarted && !isWhiteTurn}
          />
        <div className="board-container">
          <Chessboard
            position={game.fen()}
            onPieceDrop={handlePieceDrop}
            onSquareClick={handleSquareClick}
            arePiecesDraggable={true}
            boardWidth={600}
            customBoardStyle={{
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(247, 31, 31, 0.3)",
            }}
            customDarkSquareStyle={{ backgroundColor: "#c58d5e" }}
            customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
            customSquareStyles={{
              ...Object.fromEntries(
                possibleMoves.map((move) => [
                  move,
                  {
                    backgroundColor: "rgba(255,215,0,0.4)",
                    borderRadius: "50%",
                  },
                ])
              ),
              ...(selectedSquare && {
                [selectedSquare]: {
                  backgroundColor: "rgba(255,215,0,0.8)",
                },
              }),
            }}
          />
        </div>
          <Clock
            initialTime={blackTimeLeft}
            isActive={gameStarted && !isWhiteTurn}
          />
      </div>
    </div>
  );
}