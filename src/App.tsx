import { useEffect, useState, useRef } from "react";
import TileButton from "./components/TileButton";
import HintTiles from "./components/HintTIles";
import Card from "./components/card";
import LevelSlider from "./components/LevelSlider";

type TtileData = {
  value: number;
  isFlipped?: boolean | undefined;
};

function App() {
  /* VARIABLES */
  const [level, setLevel] = useState<number>(1);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [nTiles, setNTiles] = useState<number>(16); // Will be set dynamically
  const SQRT_N_Tiles: number = Math.sqrt(nTiles);
  const [score, setScore] = useState<number>(1);
  const [cumulativeScore, setCumulativeScore] = useState<number>(0);
  const [bombFound, setBombFound] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [tilesData, setTilesData] = useState<TtileData[][]>([]);
  const [sumsOfRow, setSumsOfRow] = useState<number[]>([]);
  const [sumsOfCol, setSumsOfCol] = useState<number[]>([]);
  const [bombsInRow, setBombsInRow] = useState<number[]>([]);
  const [bombsInCol, setBombsInCol] = useState<number[]>([]);
  const [restartKey, setRestartKey] = useState<number>(0);
  const levelUpTimeout = useRef<number | null>(null);

  // Dynamic grid and bomb scaling
  let gridSize = 16;
  let maxBombs = 3;
  if (level >= 6 && level <= 10) {
    gridSize = 25;
    maxBombs = 4;
  } else if (level >= 11) {
    gridSize = 36;
    maxBombs = Math.floor(Math.random() * 2) + 5; // 5 or 6 bombs
  }

  // Helper to shuffle an array
  function shuffle<T>(array: T[]): T[] {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Generate new level or board
  useEffect(() => {
    // If nTiles was changed by the LevelSlider, reset level to 1
    if (nTiles !== gridSize) setLevel(1);
    const SQRT = Math.sqrt(nTiles);
    // Generate flat array with bombs and numbers
    const totalTiles = nTiles;
    const bombs = Array(maxBombs).fill(0);
    const numbers = Array(totalTiles - maxBombs)
      .fill(0)
      .map(() => Math.ceil(Math.random() * 3));
    const allTiles = shuffle([...bombs, ...numbers]);

    // Build 2D grid
    const newTilesData: TtileData[][] = [];
    for (let i = 0; i < SQRT; i++) {
      newTilesData.push(
        allTiles.slice(i * SQRT, (i + 1) * SQRT).map((value) => ({
          value,
          isFlipped: false,
        }))
      );
    }
    setTilesData(newTilesData);

    // Calculate row/col sums and bomb counts
    const newSumsOfRow = newTilesData.map((row) =>
      row.reduce((sum, tile) => (tile.value !== 0 ? sum + tile.value : sum), 0)
    );
    setSumsOfRow(newSumsOfRow);

    const newSumsOfCol = newTilesData[0].map((_, colIndex) =>
      newTilesData.reduce(
        (sum, row) =>
          row[colIndex].value !== 0 ? sum + row[colIndex].value : sum,
        0
      )
    );
    setSumsOfCol(newSumsOfCol);

    const newBombsInRow = newTilesData.map((row) =>
      row.reduce((count, tile) => (tile.value === 0 ? count + 1 : count), 0)
    );
    setBombsInRow(newBombsInRow);

    const newBombsInCol = newTilesData[0].map((_, colIndex) =>
      newTilesData.reduce(
        (count, row) => (row[colIndex].value === 0 ? count + 1 : count),
        0
      )
    );
    setBombsInCol(newBombsInCol);

    setScore(1);
    setBombFound(false);
    setWin(false);
  }, [level, restartKey, nTiles]);

  // Level completion logic
  const flipCard = (rowIndex: number, colIndex: number) => {
    if (tilesData[rowIndex][colIndex].isFlipped || bombFound || win) return;
    const tile = tilesData[rowIndex][colIndex];
    const isBomb = tile.value === 0;
    setTilesData((prevTilesData) =>
      prevTilesData.map((row, i) =>
        row.map((tile, j) =>
          i === rowIndex && j === colIndex ? { ...tile, isFlipped: true } : tile
        )
      )
    );
    if (isBomb) {
      setBombFound(true);
      return;
    }
    setScore((prev) => prev * (tile.value || 1));

    // Check level completion: all non-bomb tiles with value > 1 are revealed
    setTimeout(() => {
      const allHighValueTiles = tilesData
        .flat()
        .filter((t) => t.value !== 0 && t.value !== 1);
      const revealedHighValueTiles =
        tilesData
          .flat()
          .filter((t) => t.value !== 0 && t.value !== 1 && t.isFlipped).length +
        (tile.value > 1 ? 1 : 0); // +1 if this flip is >1
      if (revealedHighValueTiles >= allHighValueTiles.length) {
        // Level up
        setShowLevelUp(true);
        setCumulativeScore((prev) => prev + score * (tile.value || 1));
        levelUpTimeout.current = setTimeout(() => {
          setShowLevelUp(false);
          setLevel((prev) => prev + 1);
        }, 1500);
      }
    }, 0);
  };

  // Reset everything on game over
  const handleRestart = () => {
    setRestartKey((k) => k + 1);
    setLevel(1);
    setCumulativeScore(0);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (levelUpTimeout.current) clearTimeout(levelUpTimeout.current);
    };
  }, []);

  /* CONSOLE LOGGING */
  useEffect(() => {
    console.log(bombsInRow);
  }, []);
  /* CONSOLE LOGGING */

  // Build a true (N+1)x(N+1) grid as a flat array
  const gridCells = [];
  for (let row = 0; row < SQRT_N_Tiles + 1; row++) {
    for (let col = 0; col < SQRT_N_Tiles + 1; col++) {
      if (row === 0 && col === 0) {
        // Top-left empty cell
        gridCells.push(<div key="empty" />);
      } else if (row === 0) {
        // Column hints
        gridCells.push(
          <HintTiles
            key={`col-hint-${col - 1}`}
            values={[sumsOfCol[col - 1]]}
            bombs={[bombsInCol[col - 1]]}
          />
        );
      } else if (col === 0) {
        // Row hints
        gridCells.push(
          <HintTiles
            key={`row-hint-${row - 1}`}
            values={[sumsOfRow[row - 1]]}
            bombs={[bombsInRow[row - 1]]}
          />
        );
      } else {
        // Tiles
        const tile = tilesData[row - 1]?.[col - 1];
        gridCells.push(
          <TileButton
            bombFound={bombFound}
            key={`${row - 1}-${col - 1}`}
            setBombFound={setBombFound}
            index={row - 1 + col - 1 + 1}
            value={tile?.value}
            flipCard={() => !tile?.isFlipped && flipCard(row - 1, col - 1)}
            cardFlipped={tile?.isFlipped}
            lastTile={nTiles}
          />
        );
      }
    }
  }

  // Dynamic frame size calculation
  const MIN_TILE_SIZE = 56; // px
  const GAP = 4; // px
  const frameSize = MIN_TILE_SIZE * (SQRT_N_Tiles + 1) + GAP * SQRT_N_Tiles;

  return (
    <div className="app min-h-screen min-w-screen flex flex-col items-center bg-blue-100 font-sans">
      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-6 flex justify-center w-full pointer-events-none animate-bounceIn">
          <div className="pointer-events-auto">
            <Card
              header={
                <span className="text-3xl text-success font-extrabold">
                  LEVEL UP!
                </span>
              }
              className="w-[20rem] px-4 py-2 border-success border-4"
            >
              <div className="text-xl font-bold text-success mb-2 text-center">
                Welcome to Level {level + 1}!
              </div>
            </Card>
          </div>
        </div>
      )}
      {/* Overlay for Game Over or Win */}
      {(bombFound || win) && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-6 flex justify-center w-full pointer-events-none">
          <div className="pointer-events-auto">
            <Card
              header={
                win ? (
                  <span className="flex items-center gap-2">
                    <span className="text-3xl">VICTORY</span>
                    {win && (
                      <span className="flex gap-1 text-yellow-400 text-3xl">
                        ★ ★ ★
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-3xl">GAME OVER</span>
                )
              }
              actions={
                <button
                  className="btn btn-primary btn-lg rounded-full px-10 mt-2 shadow-md"
                  onClick={handleRestart}
                >
                  Restart
                </button>
              }
              className="w-[28rem] px-4 py-2"
            >
              <div className="text-2xl font-bold text-gray-700 mb-2">
                Level: <span className="text-primary">{level}</span>
              </div>
              <div className="text-xl font-bold text-success mb-2">
                Cumulative Score:{" "}
                <span className="text-primary">{cumulativeScore}</span>
              </div>
            </Card>
          </div>
        </div>
      )}
      {/* Main Game Grid, centered and a bit towards the top */}
      <div
        className="flex flex-col items-center justify-center w-full"
        style={{ minHeight: "60vh", marginTop: "3vh" }}
      >
        <div
          className="grid aspect-square"
          style={{
            gridTemplateColumns: `repeat(${SQRT_N_Tiles + 1}, 1fr)`,
            gridTemplateRows: `repeat(${SQRT_N_Tiles + 1}, 1fr)`,
            gap: `${GAP}px`,
            width: frameSize,
            height: frameSize,
            maxWidth: "100vw",
            maxHeight: "70vh",
            minWidth: 0,
            minHeight: 0,
          }}
        >
          {gridCells}
        </div>
      </div>
      {/* Docked header/navbar at the bottom */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] bg-base-100 border-t-2 border-primary shadow-lg flex flex-row items-center justify-between gap-4 px-4 py-3 z-40">
        <span className="text-xs sm:text-base font-bold text-success bg-base-200 rounded-xl px-3 py-1 border-2 border-success/30 shadow">
          Level: <span className="text-primary">{level}</span>
        </span>
        <span className="text-xs sm:text-base font-bold text-success bg-base-200 rounded-xl px-3 py-1 border-2 border-success/30 shadow">
          Score: <span className="text-primary">{score}</span>
        </span>
        <span className="text-xs sm:text-base font-bold text-success bg-base-200 rounded-xl px-3 py-1 border-2 border-success/30 shadow">
          Cumulative: <span className="text-primary">{cumulativeScore}</span>
        </span>
      </div>
      {/* Development: Grid Sizer in bottom right */}
      <div className="fixed bottom-4 right-4 z-50 bg-base-200 rounded-xl shadow-lg p-2 border border-primary">
        <LevelSlider gridSize={nTiles} setGridSize={setNTiles} />
      </div>
    </div>
  );
}

export default App;
