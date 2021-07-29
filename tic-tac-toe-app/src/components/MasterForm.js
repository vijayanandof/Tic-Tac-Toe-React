import React from "react";
import { Modal } from "react-bootstrap";

/**
 * Multi-step form for getting 2 inputs
 * 1. Game Mode 
 * 2. Player Names
 *
 * @export
 * @class MasterForm
 * @extends {React.Component}
 * @returns <MasterForm/>
 */
export class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      playMode: "1",
      playerX: "",
      player0: "",
      formState: true,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    // Vs Computer state
    if(name === 'playMode' && value ==="2"){
      this.setState({
        player0: "Computer",
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { playMode, playerX, player0 } = this.state;
    this.handleCloseForm();
    sessionStorage.setItem("playMode", playMode);
    sessionStorage.setItem("playerX", playerX);
    sessionStorage.setItem("player0", player0);
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary spacing-left"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 2) {
      return (
        <button className="btn btn-primary" type="button" onClick={this._next}>
          Next
        </button>
      );
    }
    return null;
  }

  handleCloseForm = () => {
    this.setState({
      formState: false,
    });
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.formState}
          onHide={this.handleCloseForm}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Let's play a Tic-Tac-Toe Game.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b>Step {this.state.currentStep} of 2: </b>
            <br></br>
            <br></br>
            <form onSubmit={this.handleSubmit}>
              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                playMode={this.state.playMode}
              />
              <Step2
                currentStep={this.state.currentStep}
                playMode={this.state.playMode}
                handleChange={this.handleChange}
                playerX={this.state.playerX}
              />
              {this.previousButton()}
              {this.nextButton()}
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="playMode">Choose a Game Mode: </label>
      <select
        className="form-select"
        aria-label="Choose a game mode:"
        onChange={props.handleChange}
        value={props.playMode}
        id="playMode"
        name="playMode"
      >
        <option defaultValue value="1">
          2 Players (Default)
        </option>
        <option value="2">Vs Computer</option>
      </select>
      <br></br>
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  if (props.playMode === "2") {
    return (
      <>
        <div className="form-group">
          <label htmlFor="playerX">Enter name of Player 1(X):</label>
          <input
            className="form-control"
            id="playerX"
            name="playerX"
            type="text"
            placeholder="(X)"
            value={props.playerX}
            onChange={props.handleChange}
            required
          />
          <br></br>
        </div>
        <button className="btn btn-success btn-block float-right">
          Start Game!
        </button>
      </>
    );
  } else if (props.playMode === "1") {
    return (
      <>
        <div className="form-group">
          <label htmlFor="playerX">Enter name of Player 1(X):</label>
          <input
            className="form-control"
            id="playerX"
            name="playerX"
            type="text"
            placeholder="(X)"
            value={props.playerX}
            onChange={props.handleChange}
            required
          />
          <label htmlFor="player0">Enter name of Player 2(0):</label>
          <input
            className="form-control"
            id="player0"
            name="player0"
            type="text"
            placeholder="(0)"
            value={props.player0}
            onChange={props.handleChange}
            required
          />
          <br></br>
        </div>
        <button className="btn btn-success btn-block float-right">
          Start Game!
        </button>
      </>
    );
  }
}
