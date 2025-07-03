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
      <div className="fixed top-0 left-0 w-[100svw] sm:w-full z-50 flex justify-center animate-slide-down-fade pointer-events-none">
        <div
          className={`w-full max-w-xs sm:max-w-xl rounded-b-2xl shadow-2xl border-b-4 px-2 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between pointer-events-auto mt-0
                ${
                  win
                    ? "bg-green-600 border-green-700 text-white"
                    : "bg-red-900 border-red-950 text-red-100"
                }`}
          style={{ minWidth: 0 }}
        >
          {/* Left: Game Over / Victory */}
          <span
            className={`text-2xl sm:text-3xl font-extrabold tracking-wide ${
              win ? "text-white" : "text-red-100"
            }`}
          >
            {win ? "VICTORY" : "GAME OVER"}
          </span>
          {/* Middle: Info */}
          <div className="flex flex-col items-center mx-2 sm:mx-4 my-2 sm:my-0">
            {win && (
              <span className="flex gap-1 text-yellow-300 text-lg sm:text-xl mb-1">
                ★ ★ ★
              </span>
            )}
            <div
              className={`text-base sm:text-lg font-bold ${
                win ? "text-green-100" : "text-red-200"
              }`}
            >
              Level: <span className="text-white">{level}</span>
            </div>
            <div
              className={`text-base sm:text-lg font-bold ${
                win ? "text-green-100" : "text-red-200"
              }`}
            >
              Cumulative: <span className="text-white">{cumulativeScore}</span>
            </div>
          </div>
          {/* Right: Restart Button */}
          <button
            className={`btn btn-md rounded-full px-4 sm:px-6 ml-0 sm:ml-4 shadow-lg text-base sm:text-lg font-bold transition
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
