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
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center animate-bounceIn pointer-events-none">
        <div
          className="w-full max-w-xl rounded-b-2xl shadow-2xl border-b-4 border-green-900 bg-green-700 text-green-100 px-8 py-4 flex flex-row items-center justify-center pointer-events-auto mt-0"
          style={{ minWidth: 320 }}
        >
          <span className="text-3xl font-extrabold tracking-wide mr-4 text-white">
            LEVEL UP!
          </span>
          <span className="text-xl font-bold text-green-100">
            Welcome to Level {level + 1}!
          </span>
        </div>
      </div>
    </ScreenOverlay>
  );
}
