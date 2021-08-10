import { useEffect, useState } from "react";
import Square from "./Square";
import { checkWinner, storeHistory } from "../utils/checkWinner";
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

  if (localStorage.getItem("history") === null) {
    localStorage.setItem("history", JSON.stringify({ history: [] }));
  }

  /**
   *  Modal and state handling.
   */
  const handleWinnerModalClose = () => {
    setShowWinnerModalState(false);
    clearGame();
    // sessionStorage.clear();
    // window.location.reload();
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
      storeHistory(winner);
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
        <div>
          <h1 className="header">Tic Tac Toe</h1>
          <br></br>
          <MasterForm />
          <div className="game-container">
            {Array.from(Array(9).keys()).map((number) => (
              <Square
                key={number}
                onClick={() => onSquareClicked(number)}
                state={gameState[number]}
              ></Square>
            ))}
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
        <div>
        <div className="history">
          {getHistory()}

        </div>
        <Button
            className="history-button"
            onClick={() =>{
              localStorage.setItem("history", JSON.stringify({ history: [] }));
              window.location.reload();
            }
            }
          >
            Clear history
          </Button>
          </div>
      </div>
    </>
  );

  function getHistory() {
    return JSON.parse(localStorage.getItem("history")).history.map(
      (item, key) => {
        return (
          <div key={key} className="list-item">
            {key + 1}.{item.playerX} & {item.player0} played.
            {item.winState === "Draw"
              ? "Game Draw."
              : item.winState === "X"
                ? item.playerX + " Won."
                : item.player0 + " Won."}
          </div>
        );
      }
    );
  }

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
