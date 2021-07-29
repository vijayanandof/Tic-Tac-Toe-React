import { useEffect, useState } from "react";
import Square from "./Square";
import { checkWinner } from "../utils/checkWinner";
import { Button } from "react-bootstrap";
import ShowWinner from "./ShowWinner";
import { MasterForm } from "./MasterForm";
import { minimax } from "../utils/computerPlayer";

/* Inital Game states */
const initialState = Array.from(Array(9).keys());
let winner = "";

/**
 * Game Component holds
 * Board, Square, Masterform, ShowWinner comps
 * and does state handling.
 *
 * @returns <Game/>
 */
function Game() {
  const [gameState, updateGameState] = useState(initialState);
  const [isXChance, updateIsXChance] = useState(true);
  const [showWinnerModal, setShowWinnerModalState] = useState(false);

  /**
   *  Modal and state handling.
   */
  const handleWinnerModalClose = () => {
    setShowWinnerModalState(false);
    clearGame();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleWinnerModalShow = () => {
    setShowWinnerModalState(true);
  };

  function onSquareClicked(index) {
    let strings = Array.from(gameState);
    if (typeof strings[index] !== "number") return;
    strings[index] = getCurrentChance(isXChance);
    updateIsXChance(!isXChance);
    updateGameState(strings);
  }

  const clearGame = () => {
    updateIsXChance(true);
    updateGameState(initialState);
  };

  function getTitleForModal() {
    if (winner === "Draw") {
      return "Game Draw.";
    } else {
      return (
        "Woohoo!! " +
        (winner === "X"
          ? "Player1 (X) - " + sessionStorage.getItem("playerX") + " Won."
          : "Player2 (0) - " + sessionStorage.getItem("player0") + " Won.")
      );
    }
  }

  function getCurrentChance(isXChance) {
    return isXChance ? "X" : "0";
  }

  // Hook for gameState change
  useEffect(() => {
    winner = checkWinner(gameState);
    if (winner) {
      handleWinnerModalShow();
    }
  }, [gameState]);

  // Hook for isXChance change
  useEffect(() => {
    if (!isXChance && sessionStorage.getItem("player0") === "Computer") {
      let strings = Array.from(gameState);
      strings[minimax(gameState, "0").index] = getCurrentChance(isXChance);
      updateGameState(strings);
      updateIsXChance(!isXChance);
    }
  }, [isXChance, gameState]);

  return (
    <>
      <div className="App">
        <h1 className="header">Tic Tac Toe</h1>
        <br></br>
        <MasterForm />
        <div className="game-container">
          <Square
            onClick={() => onSquareClicked(0)}
            state={gameState[0]}
          ></Square>
          <Square
            onClick={() => onSquareClicked(1)}
            state={gameState[1]}
          ></Square>
          <Square
            onClick={() => onSquareClicked(2)}
            state={gameState[2]}
          ></Square>
          <Square
            onClick={() => onSquareClicked(3)}
            state={gameState[3]}
          ></Square>
          <Square
            onClick={() => onSquareClicked(4)}
            state={gameState[4]}
          ></Square>
          <Square
            onClick={() => onSquareClicked(5)}
            state={gameState[5]}
          ></Square>
          <Square
            onClick={() => onSquareClicked(6)}
            state={gameState[6]}
          ></Square>
          <Square
            onClick={() => onSquareClicked(7)}
            state={gameState[7]}
          ></Square>
          <Square
            onClick={() => onSquareClicked(8)}
            state={gameState[8]}
          ></Square>
        </div>
        <br></br>
        <h3 className="player">
          Player :{getCurrentChance(isXChance)}
          's turn now.
        </h3>
        <ShowWinner
          show={showWinnerModal}
          onHide={handleWinnerModalClose}
          title={getTitleForModal()}
          body={getWinnerModalBody()}
        ></ShowWinner>
        <br></br>
        <Button onClick={() => clearGame()}>Clear grid</Button>
      </div>
    </>
  );

  function getWinnerModalBody() {
    if (winner === "Draw") {
      return "Close to try again.";
    } else {
      return (
        (winner === "X"
          ? "Player2(Y) " + sessionStorage.getItem("player0")
          : "Player1(X) " + sessionStorage.getItem("playerX")) +
        ". Better luck next time."
      );
    }
  }
}
export default Game;
