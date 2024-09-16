import { useState } from "react";

import Plant from "./plant";
import Razor from "./razor";
import { MachineHead, MachineBody } from "./machine";

import "./grid.css";

type DisplayData = number[][];

export default function Grid(
  { displayData, pause }: 
  { displayData: DisplayData, pause: boolean }
) {

  let h = displayData.length;
  let w = (displayData.length == 0) ? 0 : displayData[0].length;

  return (
    <div className = "bg-[--dirt-color] border-[10px] " >
      {[...Array(h)].map((_v, i) =>
        <div className="flex flex-row" key = { i } >
          {[...Array(w)].map((_v, j) =>
            (() => {
              let tileType = displayData[i][j];
              if (4 <= tileType && tileType <= 7) 
                return <MachineHead direction = { tileType - 4 } key = { j } />;
              if (tileType == 14) 
                return <MachineBody key = { j } />;
              if (tileType == 8 || tileType == 9) 
                return <Razor hasBomb = { tileType == 9 } key = { j } />; 
              return <Plant plantType = { tileType % 10 } 
                hasBomb = { tileType >= 10 } pause = { pause } key = { j } 
              />;
            })()
          )}
        </div>
      )}
    </div>
  );
}
