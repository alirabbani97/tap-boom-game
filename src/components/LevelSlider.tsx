import React, { Dispatch, SetStateAction } from "react";

export default function LevelSlider({
  gridSize,
  setGridSize,
}: {
  gridSize: number;
  setGridSize: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-center items-center text-3xl">
      <span>Grid Size: </span>
      <input
        type="range"
        min={16}
        max={64}
        onChange={(e) => setGridSize(e.target.valueAsNumber)}
        value={gridSize}
      ></input>{" "}
      <span className="text-6xl">{gridSize}</span>
    </div>
  );
}
