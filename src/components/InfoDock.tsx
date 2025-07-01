type InfoDockProps = {
  level: number;
  score: number;
  cumulativeScore: number;
};

const InfoDock = ({ level, score, cumulativeScore }: InfoDockProps) => (
  <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] bg-primaryblue border-t-2 border-primaryblue shadow-[0_-4px_24px_0_rgba(88,128,233,0.10)] flex flex-row items-center justify-between gap-4 px-4 py-3 z-40 rounded-t-2xl animate-navbar-fade">
    <span className="text-xs sm:text-base font-bold text-white bg-primaryblue rounded-xl px-3 py-1 border-2 border-white/20 shadow">
      Level: <span className="text-yellow-200">{level}</span>
    </span>
    <span className="text-xs sm:text-base font-bold text-white bg-skyblue/70 rounded-xl px-3 py-1 border-2 border-white/20 shadow">
      Score: <span className="text-yellow-200">{score}</span>
    </span>
    <span className="text-xs sm:text-base font-bold text-white bg-primaryblue rounded-xl px-3 py-1 border-2 border-white/20 shadow">
      Cumulative: <span className="text-yellow-200">{cumulativeScore}</span>
    </span>
  </div>
);

export default InfoDock;
