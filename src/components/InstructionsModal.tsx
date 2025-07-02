// import React from "react";
import ScreenOverlay from "./ScreenOverlay";

const Tile = ({
  value,
  highlight = false,
}: {
  value: number | string;
  highlight?: boolean;
}) => (
  <span
    className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl shadow font-extrabold text-2xl sm:text-3xl mx-1
      ${
        value === "💣"
          ? "bg-purple text-white border-2 border-purple"
          : highlight
          ? "bg-green-200 text-green-900 border-2 border-green-400"
          : "bg-primaryblue text-white border-2 border-primaryblue"
      }
    `}
    style={{ minWidth: 36 }}
  >
    {value}
  </span>
);

export default function InstructionsModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <ScreenOverlay show={true}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative bg-blue-900 border-4 border-primaryblue rounded-3xl shadow-2xl max-w-[95vw] w-full sm:w-[600px] p-6 sm:p-8 animate-slide-up-fade">
          <button
            onClick={onClose}
            aria-label="Close instructions"
            className="absolute top-3 right-3 flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-full bg-white/30 hover:bg-yellow-300 hover:text-primaryblue text-white border-2 border-white/30 shadow focus:outline-none focus:ring-2 focus:ring-yellow-300 z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7 pointer-events-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-extrabold text-white drop-shadow mb-2 text-center">
            How to Play
          </h2>
          <div className="text-base sm:text-lg text-white/90 font-medium space-y-4 mt-4">
            {/* <div className="flex flex-wrap items-center justify-center gap-2 border-2 p-2">
              <Tile value={3} highlight />
              <Tile value={2} highlight />
              <Tile value={1} />
              <Tile value={"💣"} />
            </div> */}
            <ul className="list-none pl-0 space-y-3 mt-2 border-4 border-green-500 rounded-xl p-2">
              <li className="flex items-center gap-2">
                <Tile value={3} highlight />
                <Tile value={2} highlight />
                <span className="pl-3">
                  <span className="font-bold text-green-200">Reveal</span> all{" "}
                  2s and 3s to level up.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Tile value={1} />
                <span>
                  <span className="font-bold text-yellow-200 pl-3">1s</span> are
                  optional for level completion.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Tile value={"💣"} />
                <span>
                  <span className="font-bold text-red-300 pl-3">
                    Avoid bombs
                  </span>{" "}
                  or the game ends!
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <Tile value={2} highlight />
                  <span className="text-white font-bold text-lg">×</span>
                  <Tile value={3} highlight />
                </span>
                <span>
                  <span className="font-bold">Score</span> multiplies with each
                  tile you reveal.
                </span>
              </li>
              <li className="flex items-center gap-2 relative">
                <span className=" items-center space-y-2 z-50">
                  <span className="badge bg-purple text-white text-md font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="text-lg">💣</span> 2
                  </span>
                  <span className="badge bg-primaryblue text-white text-lg font-extrabold px-5 py-1 rounded-full ml-1">
                    10
                  </span>
                </span>
                <span className="pl-3 z-50">
                  <span>
                    {" "}
                    These tell the number of bombs and sums of value in that row
                    or column!{" "}
                  </span>
                </span>
                <div className="absolute bg-white/10 w-[103%] h-[125%] " />
              </li>
              {/* <li className="flex items-center gap-2">
                <span className="bg-lightblue text-primaryblue rounded-xl px-2 py-1 font-bold">
                  Grid grows
                </span>
                <span>and more bombs appear as you level up!</span>
              </li> */}
            </ul>
            <div className="mt-4 text-sm text-white/80 text-center">
              Tip: Use logic and deduction to avoid bombs and maximize your
              score!
            </div>
          </div>
        </div>
      </div>
    </ScreenOverlay>
  );
}
