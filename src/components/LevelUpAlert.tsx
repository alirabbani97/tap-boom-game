import ScreenOverlay from "./ScreenOverlay";

export default function LevelUpAlert({
  showLevelUp,
  level,
}: {
  showLevelUp: boolean;
  level: number;
}) {
  return (
    <ScreenOverlay show={showLevelUp}>
      <div className="fixed top-0 left-0 w-[100svh] sm:w-full z-50 flex justify-center animate-bounceIn pointer-events-none">
        <div
          className="w-full max-w-xs sm:max-w-xl rounded-b-2xl shadow-2xl border-b-4 border-green-900 bg-green-700 text-green-100 px-2 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-center pointer-events-auto mt-0"
          style={{ minWidth: 0 }}
        >
          <span className="text-2xl sm:text-3xl font-extrabold tracking-wide mr-0 sm:mr-4 text-white mb-2 sm:mb-0">
            LEVEL UP!
          </span>
          <span className="text-base sm:text-xl font-bold text-green-100">
            Welcome to Level {level + 1}!
          </span>
        </div>
      </div>
    </ScreenOverlay>
  );
}
