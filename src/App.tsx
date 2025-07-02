import { useEffect, useState, useRef } from "react";
// import LevelSlider from "./components/LevelSlider";
import GameGrid from "./components/GameGrid";
import InfoDock from "./components/InfoDock";
import LevelUpAlert from "./components/LevelUpAlert";
import GameOverModal from "./components/GameOverModal";

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
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (levelUpTimeout.current) clearTimeout(levelUpTimeout.current);
    };
  }, []);

  return (
    <div className="app min-h-screen w-full flex flex-col items-center justify-center font-comfortaa bg-gradient-to-br from-primaryblue via-lightblue to-lavender relative overflow-x-hidden">
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
        />
      </div>
      {/* Docked header/navbar at the bottom */}
      <InfoDock
        level={level}
        score={score}
        cumulativeScore={cumulativeScore}
        gridSize={nTiles}
        setGridSize={handleGridSizeChange}
      />
    </div>
  );
}

export default App;
