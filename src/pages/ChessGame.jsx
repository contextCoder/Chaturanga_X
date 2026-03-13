import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Clock from "../components/Clock";
import GameOptions from "../components/utils/Game.Options";
import "./ChessGame.css";

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [initialTime, setInitialTime] = useState(null);
  const [whiteTimeLeft, setWhiteTimeLeft] = useState(5);
  const [blackTimeLeft, setBlackTimeLeft] = useState(5);

  const [gameStarted, setGameStarted] = useState(true);
  const [gameOverMessage, setGameOverMessage] = useState("");

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);

  const isWhiteTurn = game.turn() === "w";

  const startGame = (seconds) => {
    setInitialTime(seconds);
    setWhiteTimeLeft(seconds);
    setBlackTimeLeft(seconds);
    setGameStarted(true);
  };
  /*
  TIMER
  */
  useEffect(() => {
    if (!gameStarted || gameOverMessage || !initialTime) return;

    const interval = setInterval(() => {
      if (isWhiteTurn) {
        setWhiteTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setBlackTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isWhiteTurn, gameStarted, gameOverMessage]);

  /*
  TIMEOUT DETECTION
  */
  useEffect(() => {
    if (!initialTime) return;
    
    game.isCheckmate() && setGameOverMessage(isWhiteTurn ? "Black wins by checkmate!" : "White wins by checkmate!");
    game.isStalemate() && setGameOverMessage("It's a stalemate!");
    game.isInsufficientMaterial() && setGameOverMessage("Draw by insufficient material!");
  }, [whiteTimeLeft, blackTimeLeft]);

  /*
  MOVE LOGIC
  */
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

  /*
  DRAG DROP
  */
  const handlePieceDrop = (sourceSquare, targetSquare) => {
    const moveMade = makeMove(sourceSquare, targetSquare);

    if (moveMade) {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }

    return moveMade;
  };

  /*
  CLICK MOVE
  */
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

  /*
  RESET GAME
  */
  const resetGame = () => {
    setGame(new Chess());
    setWhiteTimeLeft(initialTime);
    setBlackTimeLeft(initialTime);
    setGameOverMessage("");
    setSelectedSquare(null);
    setPossibleMoves([]);
  };

  return (
    <>
      {!initialTime && (
          <GameOptions onStart={startGame} />
        )}

      <div className="chess-game-container">
        {gameOverMessage && (
          <div className="game-over-popup">
            <h2>Game Over</h2>
            <p>{gameOverMessage}</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
        <div className="chess-game">
          <Clock
            time={blackTimeLeft}
            isActive={!isWhiteTurn}
            width={137}
            height={80}
            top={"2.5em"}
            right={0}
          />

          <div className="board-container">
            <Chessboard
              position={game.fen()}
              onPieceDrop={handlePieceDrop}
              onSquareClick={handleSquareClick}
              boardWidth={600}
              customBoardStyle={{
                borderRadius: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
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
            time={whiteTimeLeft}
            isActive={isWhiteTurn}
            width={137}
            height={80}
            top={"22em"}
            right={0}
          />
        </div>
      </div>
    </>
  );
}