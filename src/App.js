import './App.css';

import React from 'react';

import { useState, useRef, useEffect, useCallback } from 'react';


export default function App() {
  return (
    <DrumMachine />
  );
}

function DrumMachine() {
  const [audioName, setAudioName] = useState('Press a key');

  function updateDisplay(audioName){
    setAudioName(audioName);
  }

  return (
    <div id="drum-machine" >
      <header>
        <h1>The Incredible Drum Machine</h1>
      </header>
      <main>
        <div id="main-section">
          <Keypad onClickOrKeyPressed={updateDisplay}/>
          <Display value={audioName}/>
        </div>
      </main>
      <footer>by @andersonfer</footer>
    </div>
  );

}

function Display({ value }){
  return(
    <div id="display">
      {value}
    </div>
  );
}

function Keypad({ onClickOrKeyPressed }){
  return (
    <div id="keys">
      <AudioKey trigger="Q" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" audioName="Heater 1" updateName={onClickOrKeyPressed}/>
      <AudioKey trigger="W" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" audioName="Heater 2" updateName={onClickOrKeyPressed}/>
      <AudioKey trigger="E" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" audioName="Heater 3" updateName={onClickOrKeyPressed}/>
      <AudioKey trigger="A" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" audioName="Heater 4" updateName={onClickOrKeyPressed}/>
      <AudioKey trigger="S" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" audioName="Clap" updateName={onClickOrKeyPressed}/>
      <AudioKey trigger="D" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" audioName="Open HH" updateName={onClickOrKeyPressed}/>
      <AudioKey trigger="Z" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" audioName="Kick n' Hat" updateName={onClickOrKeyPressed}/>
      <AudioKey trigger="X" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" audioName="Kick" updateName={onClickOrKeyPressed}/>
      <AudioKey trigger="C" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" audioName="Closed HH" updateName={onClickOrKeyPressed}/>
    </div>
  );
}

function AudioKey({ trigger, audioSrc, audioName, updateName }){
  const buttonRef = useRef(null);
  const audioRef = useRef(null);

  const handleClick = useCallback(() => {
    playSound();
    blinkButton();
    updateName(audioName);
  }, [audioName,updateName]);

  useEffect(() => {
    function handleKeyPress(e){
      if(e.key.toUpperCase() === trigger){
        handleClick();
      }
    }

    document.addEventListener("keypress",handleKeyPress);

    return () => {
      document.removeEventListener("keypress",handleKeyPress);
    }
  },[trigger,handleClick]);


  function playSound(){
    audioRef.currentTime = 0;
    audioRef.current.play();
  }

  function blinkButton(){
    buttonRef.current.classList.toggle('active');
    setTimeout(() => {buttonRef.current.classList.toggle('active');},50);
  }

  return (
    <button ref={buttonRef} name={audioName} className="drum-pad" onClick={handleClick}>
      {trigger}
      <audio
        ref={audioRef}
        className="clip"
        id={trigger}
        src={audioSrc}
        data-testid="audio-clip"
      />
    </button>
  );
}
