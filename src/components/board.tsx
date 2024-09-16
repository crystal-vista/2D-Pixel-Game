import { useState, useEffect } from "react";

import Grid from "./visual/grid";
import conway from "../logics/conway";
import machine from "../logics/machine";
import razor from "../logics/razor";

type DisplayData = number[][];
type MachineData = number[][];

export default function Board(
  { initDisplayData, initMachineData, tickInterval, tickPaused, handleChange,
    gridWidth,
    gridHeight,
    lastDir,
    setLastDir,
    foodCnt,
    setFoodCnt }:
    {
      initDisplayData: DisplayData, initMachineData: MachineData, tickInterval: number, tickPaused: boolean, gridWidth: number, handleChange : any
      gridHeight: number,
      lastDir: string,
      setLastDir: any,
      foodCnt: number,
      setFoodCnt: any,
    }
) {
  const [ displayData, setDisplayData ] = useState(initDisplayData);
  const [ machineData, setMachineData ] = useState(initMachineData);
  
  const [ updateTimes, setUpdateTimes ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (updateTimes < 20) {
        const [ d, m ] = updateBoard(displayData, machineData, gridWidth,
        gridHeight,
        lastDir,
        setLastDir,
        foodCnt,
        setFoodCnt);
        setDisplayData(d);
        setMachineData(m);
        setUpdateTimes(updateTimes + 1);
      }
      // else if (updateTimes === 20){
      //   handleChange();
      // }
    }, tickInterval);
    return () => clearInterval(interval);
  }, [displayData, machineData, updateTimes]);

  return <Grid displayData = { displayData } 
    pause = { updateTimes == 20 } 
  />;
}

function updateBoard(displayData: DisplayData, machineData: MachineData, gridWidth: number, gridHeight: number, lastDir: string, setLastDir: any, foodCnt: number, setFoodCnt: any,) {
  displayData = conway(displayData);
  [machineData, displayData] = machine(machineData, displayData, gridWidth,
    gridHeight,
    lastDir,
    setLastDir,
    foodCnt,
    setFoodCnt);
  displayData = razor(machineData, displayData);
  return [displayData, machineData];
}
