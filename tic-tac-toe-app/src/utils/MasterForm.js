import React from "react"
import { Modal } from "react-bootstrap";

export class MasterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      playMode:  "1",
      playerX: '',
      player0: '',
      formState: true
    }
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }
   
  handleSubmit = event => {
    event.preventDefault()
    const { playMode, playerX, player0 } = this.state;
    this.handleCloseForm();
    localStorage.setItem('playMode', playMode);
    localStorage.setItem('playerX', playerX);
    localStorage.setItem('player0', player0);
    alert(`Your registration detail: \n 
           playMode: ${playMode} \n 
           playerX: ${playerX} \n
           player0: ${player0} \n`)
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="btn btn-secondary float-right" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <2){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}

handleCloseForm(){
    this.setState({
        formState: false
      })
}
  
  render() {    
    return (
      <>
        <Modal
        show={this.state.formState}
        onHide={this.handleCloseForm}
        >
        <Modal.Header>
          <Modal.Title>Input</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <p>Step {this.state.currentStep} </p> 

      <form onSubmit={this.handleSubmit}>
      {/* 
        render the form steps and pass required props in
      */}
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
    console.log(props)
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="playMode">Select Game Mode: </label>
      <select className="form-select" aria-label="Choose a game mode:"
        onChange={props.handleChange} value={props.playMode} id="playMode"
        name="playMode">
        <option defaultValue value="1">2 Players</option>
        <option value="2">VS Computer</option>
        </select>
        <br></br>
    </div>
  );
}

function Step2(props) {
    console.log(props);
  if (props.currentStep !== 2) {
    return null
  } 
  console.log(props.playMode);
  if (props.playMode === "2") {
      console.log(props.playMode)
    return(
        <>
        <div className="form-group">
          <label htmlFor="playerX">playerX</label>
          <input
            className="form-control"
            id="playerX"
            name="playerX"
            type="text"
            placeholder="Enter playerX"
            value={props.playerX}
            onChange={props.handleChange}
            required
            />
            <br></br>
        </div>
        <button className="btn btn-success btn-block float-right">Start Game!</button>
        </>
      );
  }else if (props.playMode === "1") {
    return(
        <>
        <div className="form-group">
          <label htmlFor="playerX">playerX</label>
          <input
            className="form-control"
            id="playerX"
            name="playerX"
            type="text"
            placeholder="Enter playerX"
            value={props.playerX}
            onChange={props.handleChange}
            required
            />
        <label htmlFor="player0">player0</label>
          <input
            className="form-control"
            id="player0"
            name="player0"
            type="text"
            placeholder="Enter player0"
            value={props.player0}
            onChange={props.handleChange}
            required
            />
            <br></br>
        </div>
        <button className="btn btn-success btn-block float-right">Start Game!</button>
        </>
      );
  }
}