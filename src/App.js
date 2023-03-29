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
  }
  componentDidMount = () => {
    //window.focus();
  }
  render(){
    return (
      <div id="drum-machine" >
        <span id="title">The Incredible Drum Machine</span>
         <Display/>
        <footer>by @andersonfer</footer>
      </div>
    );
  }
}

class Display extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      audioName: 'Press a key'
    };
  }

  updateName = (audioKey) => {
    this.setState({
      audioName: audioKey.props.audioName
    });
  }
  render(){
    return (
      <div id="display">
        <div id="keys">
          <AudioKey trigger="Q" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" audioName="Heater 1" updateName={this.updateName}/>
          <AudioKey trigger="W" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" audioName="Heater 2" updateName={this.updateName}/>
          <AudioKey trigger="E" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" audioName="Heater 3" updateName={this.updateName}/>
          <AudioKey trigger="A" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" audioName="Heater 4" updateName={this.updateName}/>
          <AudioKey trigger="S" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" audioName="Clap" updateName={this.updateName}/>
          <AudioKey trigger="D" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" audioName="Open HH" updateName={this.updateName}/>
          <AudioKey trigger="Z" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" audioName="Kick n' Hat" updateName={this.updateName}/>
          <AudioKey trigger="X" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" audioName="Kick" updateName={this.updateName}/>
          <AudioKey trigger="C" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" audioName="Closed HH" updateName={this.updateName}/>
        </div>
        <div id="controls">
            {this.state.audioName}
        </div>
    </div>
    );
  }
}

class AudioKey extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount = () => {
    document.addEventListener("keypress",this.handleKeyPress);
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
    this.props.updateName(this);
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
      <div class="drum-pad" id={'div_'+this.props.trigger} onClick={this.play}>
        {this.props.trigger}
        <audio class="clip" id={this.props.trigger} src={this.props.audioSrc}/>
      </div>
    );
  }
}


