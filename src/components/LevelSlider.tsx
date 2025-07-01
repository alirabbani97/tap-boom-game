import { Dispatch, SetStateAction } from "react";

export default function LevelSlider({
  gridSize,
  setGridSize,
}: {
  gridSize: number;
  setGridSize: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="card bg-base-200 shadow-md rounded-xl p-4 flex flex-col items-center mb-4 w-fit">
      <div className="text-lg font-extrabold mb-2 text-primary tracking-wide">
        Grid Size
      </div>
      <div className="btn-group">
        {[16, 25, 36].map((size) => (
          <button
            key={size}
            className={`btn btn-lg rounded-full font-bold text-lg px-6 ${
              gridSize === size ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setGridSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
