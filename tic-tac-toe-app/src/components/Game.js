import { useEffect, useState } from "react";
import Square from "./square";
import { checkWinner } from "../utils/checkWinner";
import { Button } from "react-bootstrap";
import ShowWinner from "../utils/ShowWinner";
import { MasterForm } from "../utils/MasterForm";

const clearState = ["", "", "", "", "", "", "", "", "", ""];
let winner = null;
function Game() {
  const [gameState, updateGameState] = useState(clearState);
  const [isXChance, updateIsXChance] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    clearGame();
    window.location.reload();
  };

  const handleShow = () => {
    setShow(true);
  };

  function onUserClicked(index) {
    console.log(index);
    console.log(gameState);
    let strings = Array.from(gameState);
    if (strings[index]) return;
    strings[index] = isXChance ? "X" : "0";
    updateIsXChance(!isXChance);
    updateGameState(strings);
  }

  const clearGame = () => {
    updateIsXChance(true);
    updateGameState(clearState);
  };

  useEffect(() => {
    winner = checkWinner(gameState);
    if (winner) {
      handleShow();
    }
  }, [gameState]);

  return (
    <>
      <div className="App">
        <h1 className="header">Tic Tac Toe</h1>
        <br></br>
        <MasterForm></MasterForm>
        <div className="game-container">
          <Square
            onClick={() => onUserClicked(0)}
            state={gameState[0]}
          ></Square>
          <Square
            onClick={() => onUserClicked(1)}
            state={gameState[1]}
          ></Square>
          <Square
            onClick={() => onUserClicked(2)}
            state={gameState[2]}
          ></Square>
          <Square
            onClick={() => onUserClicked(3)}
            state={gameState[3]}
          ></Square>
          <Square
            onClick={() => onUserClicked(4)}
            state={gameState[4]}
          ></Square>
          <Square
            onClick={() => onUserClicked(5)}
            state={gameState[5]}
          ></Square>
          <Square
            onClick={() => onUserClicked(6)}
            state={gameState[6]}
          ></Square>
          <Square
            onClick={() => onUserClicked(7)}
            state={gameState[7]}
          ></Square>
          <Square
            onClick={() => onUserClicked(8)}
            state={gameState[8]}
          ></Square>
        </div>
        <br></br>
        <h3 className="player">
          Player :{" "}
          {isXChance
            ? "X :" + localStorage.getItem("playerX")
            : "0 :" + localStorage.getItem("player0")}
          's turn now.
        </h3>
        <ShowWinner
          show={show}
          onHide={handleClose}
          title={
            winner === "Draw"
              ? "Game Draw."
              : (winner === "X"
                  ? "X " + localStorage.getItem("playerX")
                  : "Y " + localStorage.getItem("player0")) + " Player Won."
          }
          body="Cool! Close to restart the Game."
        ></ShowWinner>
        <br></br>
        <Button onClick={() => clearGame()}>Restart ?</Button>
      </div>
    </>
  );
}

export default Game;
