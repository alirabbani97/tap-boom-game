import { useEffect, useState, useRef } from "react";
import LevelSlider from "./components/LevelSlider";
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

  // LevelSlider handler
  const handleGridSizeChange = (size: number) => {
    setLevel(1);
    setScore(1);
    setCumulativeScore(0);
    setBombFound(false);
    setWin(false);
    setRestartKey((k) => k + 1);
    setNTiles(size);
  };

  // Level up handler
  const handleLevelComplete = (levelScore: number) => {
    setShowLevelUp(true);
    setCumulativeScore((prev) => prev + levelScore);
    levelUpTimeout.current = setTimeout(() => {
      setShowLevelUp(false);
      setLevel((prev) => prev + 1);
      setScore(1);
    }, 3000);
  };

  // Bomb found handler
  const handleBombFound = () => {
    setBombFound(true);
    setWin(false);
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
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (levelUpTimeout.current) clearTimeout(levelUpTimeout.current);
    };
  }, []);

  return (
    <div className="app min-h-screen min-w-screen flex flex-col items-center justify-center font-sans bg-gradient-to-br from-primaryblue via-lightblue to-lavender">
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
      {/* Main Game Grid, centered and a bit towards the top */}
      <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  w-[600px] h-[600px] min-h-[100vh] bg-white/10  blur-xl " />
      <div className="absolute top-1/2 left-1/2  -translate-x-[69%] -translate-y-[60%] min-h-[60vh]">
        <GameGrid
          key={restartKey + "-" + level + "-" + nTiles}
          level={level}
          nTiles={nTiles}
          bombFound={bombFound}
          win={win}
          onLevelComplete={handleLevelComplete}
          onBombFound={handleBombFound}
          onScoreChange={handleScoreChange}
        />
      </div>
      {/* Docked header/navbar at the bottom */}
      <InfoDock level={level} score={score} cumulativeScore={cumulativeScore} />
      {/* Development: Grid Sizer in bottom right */}
      <div className="fixed bottom-4 right-4 z-50 bg-lavender rounded-xl shadow-lg p-2 border-2 border-primaryblue animate-navbar-fade">
        <LevelSlider gridSize={nTiles} setGridSize={handleGridSizeChange} />
      </div>
    </div>
  );
}

export default App;
