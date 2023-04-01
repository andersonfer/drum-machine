import './App.css';

import React from 'react';

export default function App() {
  return (
    <DrumMachine />
  );
}

class DrumMachine extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      audioName: 'Press a key'
    };
  }

  componentDidMount = () => {
    //window.focus();
  }

  updateDisplay = (value) => {
    this.setState({
      audioName:value
    });
  }

  render(){
    return (
      <div id="drum-machine" >
        <header>
          <h1>The Incredible Drum Machine</h1>
        </header>
        <main>
          <div id="main-section">
            <Keypad onClickOrKeyPressed={this.updateDisplay}/>
            <Display value={this.state.audioName}/>
          </div>
        </main>
        <footer>by @andersonfer</footer>
      </div>
    );
  }
}

class Display extends React.Component{

  render(){
    return (
      <div id="display">
        {this.props.value}
      </div>
    );
  }
}

class Keypad extends React.Component{
  render(){
    return (

        <div id="keys">
          <AudioKey trigger="Q" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" audioName="Heater 1" updateName={this.props.onClickOrKeyPressed}/>
          <AudioKey trigger="W" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" audioName="Heater 2" updateName={this.props.onClickOrKeyPressed}/>
          <AudioKey trigger="E" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" audioName="Heater 3" updateName={this.props.onClickOrKeyPressed}/>
          <AudioKey trigger="A" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" audioName="Heater 4" updateName={this.props.onClickOrKeyPressed}/>
          <AudioKey trigger="S" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" audioName="Clap" updateName={this.props.onClickOrKeyPressed}/>
          <AudioKey trigger="D" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" audioName="Open HH" updateName={this.props.onClickOrKeyPressed}/>
          <AudioKey trigger="Z" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" audioName="Kick n' Hat" updateName={this.props.onClickOrKeyPressed}/>
          <AudioKey trigger="X" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" audioName="Kick" updateName={this.props.onClickOrKeyPressed}/>
          <AudioKey trigger="C" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" audioName="Closed HH" updateName={this.props.onClickOrKeyPressed}/>
        </div>

    );
  }
}

class AudioKey extends React.Component{

  componentDidMount = () => {
    document.addEventListener("keypress",this.handleKeyPress);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keypress",this.handleKeyPress);
  }

  handleKeyPress = (e) => {
     if(e.key.toUpperCase() === this.props.trigger){
       this.play();
     }
  }

  play = () =>{
    this.blink();
    this.getAudioElement().currentTime = 0;
    this.getAudioElement().play();
    this.props.updateName(this.props.audioName);
  }

   blink = () => {
    this.getDivElement().className += " active";
    setTimeout(() => {this.getDivElement().className = this.getDivElement().className.replace('active','')},50);
  }

  getAudioElement = () => {
    return document.getElementById(this.props.trigger);
  }
  getDivElement = () => {
    return document.getElementById('div_'+this.props.trigger);
  }

  render(){
    return (
      <button name={this.props.audioName} className="drum-pad" id={'div_'+this.props.trigger} onClick={this.play}>

        {this.props.trigger}

        <audio
          className="clip"
          id={this.props.trigger}
          src={this.props.audioSrc}
          data-testid="audio-clip"
        />
      </button>
    );
  }
}


