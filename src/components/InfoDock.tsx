import LevelSlider from "./LevelSlider";

type InfoDockProps = {
  level: number;
  score: number;
  cumulativeScore: number;
  gridSize: number;
  setGridSize: (size: number) => void;
};

const InfoDock = ({
  level,
  score,
  cumulativeScore,
  gridSize,
  setGridSize,
  onShowInstructions,
}: InfoDockProps & { onShowInstructions: () => void }) => (
  <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] bg-primaryblue border-t-2 border-primaryblue shadow-[0_-4px_24px_0_rgba(88,128,233,0.10)] flex flex-wrap sm:flex-row  items-center justify-between gap-2 px-2 py-2 z-40 rounded-t-2xl animate-navbar-fade">
    <span className="text-xs sm:text-base font-bold text-white bg-primaryblue rounded-xl px-2 py-1 border-2 border-white/20 shadow mb-1 sm:mb-0">
      Level: <span className="text-yellow-200">{level}</span>
    </span>
    <span className="text-xs sm:text-base font-bold text-white bg-skyblue/70 rounded-xl px-2 py-1 border-2 border-white/20 shadow mb-1 sm:mb-0">
      Score: <span className="text-yellow-200">{score}</span>
    </span>
    <span className="text-xs sm:text-base font-bold text-white bg-primaryblue rounded-xl px-2 py-1 border-2 border-white/20 shadow mb-1 sm:mb-0">
      Cumulative: <span className="text-yellow-200">{cumulativeScore}</span>
    </span>
    <div className="w-full flex justify-between items-center gap-2 ">
      <LevelSlider gridSize={gridSize} setGridSize={setGridSize}  />
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
