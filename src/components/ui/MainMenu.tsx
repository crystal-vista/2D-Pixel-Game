import React, { useState } from "react";
import App from '../../app';

export default function MainMenu() {

  const [playStartGame, setStartGame]:any = useState(false);
  function startGame() {
    setStartGame(true)

  }

  return (
    <>
    {playStartGame? <App/> :
    
    <div className="main-menu flex justify-center items-center w-screen h-screen" >
      <img src="MainMenu.png" width="900" height="850" alt="alt" ></img>
      <button className="absolute mt-[300px] mr-[400px]" onClick={startGame}>
        <img alt="startButton" src="playGame.png"></img>
      </button>
    </div>
    }
    </>
  );

  
}
