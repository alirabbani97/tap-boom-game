export default function GameOverModal({
  bombFound,
  win,
  level,
  cumulativeScore,
  handleRestart,
}: {
  bombFound: boolean;
  win: boolean;
  level: number;
  cumulativeScore: number;
  handleRestart: () => void;
}) {
  return (
    <div>
      {(bombFound || win) && (
        <div className="fixed inset-0 z-50 flex flex-col items-start justify-start bg-black/30 pointer-events-none">
          <div className="absolute inset-0" />
          <div className="w-full flex justify-center mt-8 animate-slide-down-fade">
            <div
              className="bg-primaryblue text-white rounded-3xl shadow-2xl border-4 border-purple px-10 py-8 flex flex-col items-center pointer-events-auto"
              style={{ minWidth: 320, maxWidth: 420 }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-extrabold tracking-wide mb-2">
                  {win ? "VICTORY" : "GAME OVER"}
                </span>
                {win && (
                  <span className="flex gap-1 text-yellow-300 text-3xl mb-2">
                    ★ ★ ★
                  </span>
                )}
                <div className="text-xl font-bold text-lavender mb-1">
                  Level: <span className="text-white">{level}</span>
                </div>
                <div className="text-lg font-bold text-lavender mb-2">
                  Cumulative Score:{" "}
                  <span className="text-white">{cumulativeScore}</span>
                </div>
                <button
                  className="btn bg-purple text-white btn-lg rounded-full px-10 mt-2 shadow-md hover:bg-[#6846a6] transition"
                  onClick={handleRestart}
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
