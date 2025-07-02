import ScreenOverlay from "./ScreenOverlay";

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
    <ScreenOverlay show={bombFound || win}>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center animate-slide-down-fade pointer-events-none">
        <div
          className={`w-full max-w-xl rounded-b-2xl shadow-2xl border-b-4 px-8 py-4 flex flex-row items-center justify-between pointer-events-auto mt-0
                ${
                  win
                    ? "bg-green-600 border-green-700 text-white"
                    : "bg-red-900 border-red-950 text-red-100"
                }`}
          style={{ minWidth: 320 }}
        >
          {/* Left: Game Over / Victory */}
          <span
            className={`text-3xl font-extrabold tracking-wide ${
              win ? "text-white" : "text-red-100"
            }`}
          >
            {win ? "VICTORY" : "GAME OVER"}
          </span>
          {/* Middle: Info */}
          <div className="flex flex-col items-center mx-4">
            {win && (
              <span className="flex gap-1 text-yellow-300 text-xl mb-1">
                ★ ★ ★
              </span>
            )}
            <div
              className={`text-lg font-bold ${
                win ? "text-green-100" : "text-red-200"
              }`}
            >
              Level: <span className="text-white">{level}</span>
            </div>
            <div
              className={`text-lg font-bold ${
                win ? "text-green-100" : "text-red-200"
              }`}
            >
              Cumulative: <span className="text-white">{cumulativeScore}</span>
            </div>
          </div>
          {/* Right: Restart Button */}
          <button
            className={`btn btn-md rounded-full px-6 ml-4 shadow-lg text-lg font-bold transition
                  ${
                    win
                      ? "bg-green-800 text-white hover:bg-green-700"
                      : "bg-yellow-400 text-red-900 hover:bg-yellow-300 border-2 border-yellow-200"
                  }`}
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>
      </div>
    </ScreenOverlay>
  );
}
