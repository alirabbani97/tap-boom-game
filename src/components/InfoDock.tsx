import LevelSlider from "./LevelSlider";

type InfoDockProps = {
  level: number;
  score: number;
  cumulativeScore: number;
  gridSize: number;
  setGridSize: (size: number) => void;
  hintsLeft?: number;
  onUseHint?: () => void;
  progress?: { remaining: number; total: number };
};

const InfoDock = ({
  level,
  score,
  cumulativeScore,
  gridSize,
  setGridSize,
  onShowInstructions,
  hintsLeft,
  onUseHint,
  progress,
}: InfoDockProps & { onShowInstructions: () => void }) => (
  <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] bg-primaryblue border-t-2 border-primaryblue shadow-[0_-4px_24px_0_rgba(88,128,233,0.10)] flex flex-wrap sm:flex-row  items-center justify-between gap-2 px-2 py-2 z-40 rounded-t-2xl animate-navbar-fade">
    {/* Progress Bar/Counter */}
    {progress && progress.total > 0 && (
      <div className="w-full flex flex-col items-center mb-1">
        <div className="w-11/12 h-2 bg-lavender/40 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-yellow-400 rounded-full transition-all"
            style={{
              width: `${
                ((progress.total - progress.remaining) / progress.total) * 100
              }%`,
            }}
          />
        </div>
        <span className="text-xs font-bold text-yellow-200">
          High-value left: {progress.remaining} / {progress.total}
        </span>
      </div>
    )}
    <span className="text-xs sm:text-base font-bold text-white bg-primaryblue rounded-xl px-2 py-1 border-2 border-white/20 shadow mb-1 sm:mb-0">
      Level: <span className="text-yellow-200">{level}</span>
    </span>
    <span className="text-xs sm:text-base font-bold text-white bg-skyblue/70 rounded-xl px-2 py-1 border-2 border-white/20 shadow mb-1 sm:mb-0">
      Score: <span className="text-yellow-200">{score}</span>
    </span>
    <span className="text-xs sm:text-base font-bold text-white bg-primaryblue rounded-xl px-2 py-1 border-2 border-white/20 shadow mb-1 sm:mb-0">
      Cumulative: <span className="text-yellow-200">{cumulativeScore}</span>
    </span>
    {/* Hints Button */}
    {typeof hintsLeft === "number" && onUseHint && (
      <button
        onClick={onUseHint}
        disabled={hintsLeft <= 0}
        className={`flex items-center gap-1 px-3 py-1 rounded-xl border-2 shadow font-bold text-base transition
          ${
            hintsLeft > 0
              ? "bg-green-500 hover:bg-green-400 text-white border-green-600"
              : "bg-gray-300 text-gray-400 border-gray-200 cursor-not-allowed"
          }
        `}
        aria-label="Use hint"
      >
        {/* Lightbulb SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3a7 7 0 0 0-4 12.9V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.1A7 7 0 0 0 12 3Zm0 0v1m0 16v1m-4-2h8"
          />
        </svg>
        <span>Hint</span>
        <span className="ml-1 text-xs font-bold text-white">{hintsLeft}</span>
      </button>
    )}
    <div className="w-full flex justify-between items-center gap-2 ">
      <LevelSlider gridSize={gridSize} setGridSize={setGridSize} />
      <button
        onClick={onShowInstructions}
        aria-label="Show instructions"
        className="ml-2 p-2 rounded-full bg-yellow-500 hover:bg-yellow-300 text-primaryblue border-2 border-white/30 shadow transition focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        <span className="sr-only">Show instructions</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default InfoDock;
