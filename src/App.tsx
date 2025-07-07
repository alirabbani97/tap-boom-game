import { useEffect, useState, useRef } from "react";
// import LevelSlider from "./components/LevelSlider";
import GameGrid from "./components/GameGrid";
import InfoDock from "./components/InfoDock";
import LevelUpAlert from "./components/LevelUpAlert";
import GameOverModal from "./components/GameOverModal";
import InstructionsModal from "./components/InstructionsModal";

function App() {
  /* VARIABLES */
  const [level, setLevel] = useState<number>(1);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [score, setScore] = useState<number>(1);
  const [cumulativeScore, setCumulativeScore] = useState<number>(0);
  const [bombFound, setBombFound] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [restartKey, setRestartKey] = useState<number>(0);
  const levelUpTimeout = useRef<number | null>(null);
  const [nTiles, setNTiles] = useState<number>(16); // For LevelSlider only
  const [manualGridSize, setManualGridSize] = useState<boolean>(false);
  const [gridLocked, setGridLocked] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  // Start menu state
  const [showStartMenu, setShowStartMenu] = useState(true);
  const [gameMode, setGameMode] = useState<"arcade" | "timed" | null>(null);
  const [doubleTap, setDoubleTap] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [triggerHint, setTriggerHint] = useState(0);
  const [progress, setProgress] = useState({ remaining: 0, total: 0 });

  // Start menu handler
  const handleStart = (mode: "arcade" | "timed") => {
    setGameMode(mode);
    setShowStartMenu(false);
    setLevel(1);
    setCumulativeScore(0);
    setScore(1);
    setBombFound(false);
    setWin(false);
    setManualGridSize(false);
    setGridLocked(false);
    setRestartKey((k) => k + 1);
  };

  // LevelSlider handler
  const handleGridSizeChange = (size: number) => {
    setLevel(1);
    setScore(1);
    setCumulativeScore(0);
    setBombFound(false);
    setWin(false);
    setRestartKey((k) => k + 1);
    setNTiles(size);
    setManualGridSize(true);
    setGridLocked(false);
  };

  // Level up handler
  const handleLevelComplete = (levelScore: number) => {
    setShowLevelUp(true);
    setCumulativeScore((prev) => prev + levelScore);
    setGridLocked(true);
    // Grant an extra hint every two levels, capped at 3
    setHintsLeft((prev) => {
      // If the next level is divisible by 2, grant a hint (but max 3)
      const nextLevel = level + 1;
      if (nextLevel % 2 === 0 && prev < 3) {
        return Math.min(prev + 1, 3);
      }
      return prev;
    });
    levelUpTimeout.current = setTimeout(() => {
      setShowLevelUp(false);
      setLevel((prev) => prev + 1);
      setScore(1);
      setGridLocked(false);
    }, 3000);
  };

  // Bomb found handler
  const handleBombFound = () => {
    setBombFound(true);
    setWin(false);
    setGridLocked(true);
  };

  // Score change handler
  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  // Reset everything on game over
  const handleRestart = () => {
    setRestartKey((k) => k + 1);
    setLevel(1);
    setCumulativeScore(0);
    setScore(1);
    setBombFound(false);
    setWin(false);
    setManualGridSize(false);
    setGridLocked(false);
    setShowStartMenu(true);
    setGameMode(null);
    setHintsLeft(3);
  };

  // Hint handler
  const handleUseHint = () => {
    if (hintsLeft > 0) {
      setHintsLeft(hintsLeft - 1);
      setTriggerHint((v) => v + 1); // trigger effect in GameGrid
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (levelUpTimeout.current) clearTimeout(levelUpTimeout.current);
    };
  }, []);

  // Show instructions on first load/new session
  useEffect(() => {
    const seen = localStorage.getItem("tapboom_seen_instructions");
    if (!seen) {
      setShowInstructions(true);
      localStorage.setItem("tapboom_seen_instructions", "yes");
    }
  }, []);

  // Start menu UI
  if (showStartMenu) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-primaryblue/40 font-comfortaa">
        <div className="bg-primaryblue/95 rounded-2xl shadow-2xl border-4 border-skyblue p-8 flex flex-col gap-6 items-center max-w-xs w-full">
          <h1 className="text-4xl font-cherrybombone text-yellow-300 drop-shadow mb-2 tracking-wider">
            Tap Boom
          </h1>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="bg-yellow-400 hover:bg-yellow-300 text-primaryblue font-bold py-2 px-6 rounded-xl border-2 border-yellow-200 shadow transition text-lg"
              onClick={() => handleStart("arcade")}
            >
              Arcade Mode
            </button>
            <button
              className="bg-skyblue hover:bg-lightblue text-white font-bold py-2 px-6 rounded-xl border-2 border-skyblue shadow transition text-lg"
              onClick={() => handleStart("timed")}
            >
              Timed Mode
            </button>
          </div>
          <label className="flex items-center gap-2 mt-4 text-white text-base">
            <input
              type="checkbox"
              checked={doubleTap}
              onChange={(e) => setDoubleTap(e.target.checked)}
              className="accent-yellow-400 w-5 h-5"
            />
            <span>Enable Double Tap/Click</span>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="app min-h-screen w-full flex flex-col items-center justify-center font-comfortaa bg-primaryblue/40 relative overflow-x-hidden">
      {/* Level Up Alert */}
      <LevelUpAlert showLevelUp={showLevelUp} level={level} />

      {/* Overlay for Game Over or Win */}
      <GameOverModal
        bombFound={bombFound}
        win={win}
        level={level}
        cumulativeScore={cumulativeScore}
        handleRestart={handleRestart}
      />
      {/* Main Game Grid, centered and responsive */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-full h-full max-w-[430px] max-h-[90vh] bg-white/10 blur-xl rounded-3xl" />
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-[430px] px-2 pt-8 pb-32 mx-auto">
        <GameGrid
          key={restartKey + "-" + level + "-" + nTiles}
          level={level}
          nTiles={nTiles}
          manualGridSize={manualGridSize}
          bombFound={bombFound}
          win={win}
          gridLocked={gridLocked}
          onLevelComplete={handleLevelComplete}
          onBombFound={handleBombFound}
          onScoreChange={handleScoreChange}
          gameMode={gameMode}
          doubleTap={doubleTap}
          triggerHint={triggerHint}
          onProgressUpdate={(remaining, total) =>
            setProgress({ remaining, total })
          }
        />
      </div>
      {/* Docked header/navbar at the bottom */}
      <InfoDock
        level={level}
        score={score}
        cumulativeScore={cumulativeScore}
        gridSize={nTiles}
        setGridSize={handleGridSizeChange}
        onShowInstructions={() => setShowInstructions(true)}
        hintsLeft={hintsLeft}
        onUseHint={handleUseHint}
        progress={progress}
      />
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}

export default App;
