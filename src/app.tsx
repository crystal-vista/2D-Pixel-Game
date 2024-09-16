import { ChangeEvent, useState } from "react";
import Board from "./components/board";
import ControlButtons from "./components/ui/controlButtons";
import machineAppear from "./logics/machineAppear";


export default function App() {
  const [tickIntervalMs, setTickIntervalMs] = useState(500);
  const [lastDir, setLastDir] = useState("unknown");
  const [foodCnt, setFoodCnt] = useState(0);
  const [tickPaused, setTickPaused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "tickInterval") {
      setTickIntervalMs((tickIntervalMs + 800) % 1200);
    }
    else if (event.target.name === "tickPaused") {
      setTickPaused(!tickPaused);
    }
  }

  type DisplayData = number[][];

  let updateTestCase: DisplayData = [];
  for (let i = 0; i < 25; i++) {
    updateTestCase.push([...Array(40)].map(() => Math.round(Math.random() * 0.55)));
  }

  let initMachineData = [[0, 0], [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0]];

  [initMachineData, updateTestCase] = machineAppear(40, 25, initMachineData, updateTestCase);

  return (
    <div className="w-screen h-screen flex content-center justify-center flex-wrap" >
      <Board initDisplayData={updateTestCase} initMachineData={initMachineData} tickInterval={tickIntervalMs} tickPaused={tickPaused} handleChange={handleChange}
        gridWidth={40}
        gridHeight={25}
        lastDir={lastDir}
        setLastDir={setLastDir}
        foodCnt={foodCnt}
        setFoodCnt={setFoodCnt}
      />
      <ControlButtons tickIntervalMs={tickIntervalMs} tickPaused={tickPaused} handleChange={handleChange} />
    </div>
  );
}
// <button className="border-black border-2 rounded-xl w-14 h-10 mx-3"
// onClick={() => setTickIntervalMs((tickIntervalMs + 800) % 1200)}>
// {(tickIntervalMs === 100 ? "3x" : (tickIntervalMs === 500 ? "2x" : "1x"))}
// </button>
