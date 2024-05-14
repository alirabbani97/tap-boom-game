import React, { Dispatch, SetStateAction } from "react";

export default function LevelSlider({
  gridSize,
  setGridSize,
}: {
  gridSize: number;
  setGridSize: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-between items-center  text-4xl">
      <div className="flex justify-center items-center gap-x-5">
        <span>Grid Size: </span>
        <span className=" font-bold">{gridSize}</span>
        <div>
          <input
            type="radio"
            id="16"
            name="grid_size"
            className=""
            onClick={() => {
              setGridSize(16);
              console.log(gridSize);
            }}
          />
          <label htmlFor="html">16</label>
        </div>
        <div>
          <input
            type="radio"
            id="25"
            name="grid_size"
            className=""
            onClick={() => {
              setGridSize(25);
              console.log(gridSize);
            }}
          />
          <label htmlFor="html">25</label>
        </div>
        <div>
          <input
            type="radio"
            id="36"
            name="grid_size"
            className=""
            onClick={() => setGridSize(36)}
          />
          <label htmlFor="html">36</label>
        </div>
      </div>
    </div>
  );
}
