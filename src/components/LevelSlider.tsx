// import React from "react";

export default function LevelSlider({
  gridSize,
  setGridSize,
}: {
  gridSize: number;
  setGridSize: (size: number) => void;
}) {
  // Map slider positions to grid sizes
  const sliderMarks = [16, 25, 36];
  const sliderValue = sliderMarks.indexOf(gridSize);

  return (
    <div className="flex flex-col items-center w-full min-w-0 max-w-44">
      <label className="text-[0.7rem] font-bold text-white mb-1">
        Grid Size
      </label>
      <div className="flex flex-col items-center w-full min-w-0">
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={sliderValue}
          onChange={(e) => setGridSize(sliderMarks[parseInt(e.target.value)])}
          className="w-full accent-yellow-400 h-2 rounded-lg appearance-none bg-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <div className="flex w-full justify-between mt-1 text-[0.65rem] text-white">
          <span>4x4</span>
          <span>5x5</span>
          <span>6x6</span>
        </div>
      </div>
    </div>
  );
}
