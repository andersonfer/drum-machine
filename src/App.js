import './App.css';

import React from 'react';

import { useState, useRef, useEffect } from 'react';


export default function App() {
  return (
    <DrumMachine />
  );
}

function DrumMachine() {
  const [audioName, setAudioName] = useState('Press a key');

  function handleClick(audioName){
    setAudioName(audioName);
  }

  return (
    <div id="drum-machine" >
      <header>
        <h1>The Incredible Drum Machine</h1>
      </header>
      <main>
        <div id="main-section">
          <Keypad>
            <AudioKey trigger="Q" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" audioName="Heater 1" onClick={handleClick} />
            <AudioKey trigger="W" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" audioName="Heater 2" onClick={handleClick} />
            <AudioKey trigger="E" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" audioName="Heater 3" onClick={handleClick} />
            <AudioKey trigger="A" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" audioName="Heater 4" onClick={handleClick} />
            <AudioKey trigger="S" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" audioName="Clap" onClick={handleClick} />
            <AudioKey trigger="D" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" audioName="Open HH" onClick={handleClick} />
            <AudioKey trigger="Z" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" audioName="Kick n' Hat" onClick={handleClick} />
            <AudioKey trigger="X" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" audioName="Kick" onClick={handleClick} />
            <AudioKey trigger="C" audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" audioName="Closed HH" onClick={handleClick} />
          </Keypad>
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

function Keypad({ children }){
  return (
    <div id="keys">
      {children}
    </div>
  );
}

function AudioKey({ trigger, audioSrc, audioName, onClick }){
  const buttonRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {

    function handleKeyPress(e){
      if(e.key.toUpperCase() === trigger){
        buttonRef.current.click();
      }
    }

    document.addEventListener("keypress",handleKeyPress);

    return () => {
      document.removeEventListener("keypress",handleKeyPress);
    }
  });

  function handleClick(){
    playSound();
    blinkButton();
    onClick(audioName);
  }

  function playSound(){
    audioRef.current.currentTime = 0;
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
