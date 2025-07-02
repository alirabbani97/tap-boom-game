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
}: InfoDockProps) => (
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
    <div className="w-full  flex justify-center">
      <LevelSlider gridSize={gridSize} setGridSize={setGridSize} />
    </div>
  </div>
);

export default InfoDock;
