import React from "react";

export default function ControlButtons({ tickIntervalMs, tickPaused, handleChange }: { tickIntervalMs: number, tickPaused: boolean, handleChange: any }) {
  return (
    <div>
      <button className="border-black border-2 rounded-xl w-14 h-10 m-2" onClick={handleChange} name="tickInterval">
        {(tickIntervalMs === 100 ? "3x" : (tickIntervalMs === 500 ? "2x" : "1x"))}
      </button>
      <button className="border-black border-2 rounded-xl w-14 h-10 m-2" onClick={handleChange} name="tickPaused">
        {tickPaused ? "▶" : "⏸"}
      </button>
      <br />
      <button className="border-black border-2 rounded-xl w-28 h-10 m-2" onClick={handleChange} name="tickPaused">
        Place bomb
      </button>
      <br />
      <button className="border-black border-2 rounded-xl w-28 h-10 m-2" onClick={handleChange} name="tickPaused">
        Place seed
      </button>
    </div>
  )
}
