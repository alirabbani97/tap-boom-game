import { useEffect, useState } from "react";
import { shuffle } from "../utils/shuffle";
// import { MIN_TILE_SIZE } from "../constants/layout";
import TileButton from "./TileButton";
import HintTiles from "./HintTIles";
import { cn } from "../utils/cn";
import React from "react";

type TtileData = {
  value: number;
  isFlipped?: boolean | undefined;
};

type GameGridProps = {
  level: number;
  nTiles: number;
  manualGridSize: boolean;
  bombFound: boolean;
  win: boolean;
  gridLocked?: boolean;
  onLevelComplete: (score: number) => void;
  onBombFound: () => void;
  onScoreChange: (score: number) => void;
  gameMode?: "arcade" | "timed" | null;
  doubleTap?: boolean;
  triggerHint?: number;
  onProgressUpdate?: (remaining: number, total: number) => void;
};

const GAP = 8; // px

const GameGrid = ({
  level,
  nTiles,
  manualGridSize,
  bombFound,
  win,
  gridLocked = false,
  onLevelComplete,
  onBombFound,
  onScoreChange,
  triggerHint,
  onProgressUpdate,
}: GameGridProps) => {
  // Dynamic grid and bomb scaling by level
  let gridTiles = nTiles; // default to prop
  let maxBombs = 4; // Start at 4 for level 1
  if (!manualGridSize) {
    if (level >= 1 && level <= 10) {
      gridTiles = 25;
      // Levels 1-4: 4 bombs, 5-7: 5 bombs, 8-10: 6 bombs
      if (level <= 4) {
        maxBombs = 4;
      } else if (level <= 7) {
        maxBombs = 5;
      } else {
        maxBombs = 6;
      }
    } else if (level >= 11) {
      gridTiles = 36;
      // Levels 11-13: 5 bombs, 14-16: 6 bombs, 17-19: 7 bombs, 20+: 8 bombs
      if (level <= 13) {
        maxBombs = 5;
      } else if (level <= 16) {
        maxBombs = 6;
      } else if (level <= 19) {
        maxBombs = 7;
      } else {
        maxBombs = 8;
      }
    }
  } else {
    // Manual mode: use nTiles and scale bombs accordingly
    if (gridTiles === 25) {
      maxBombs = 4;
    } else if (gridTiles === 36) {
      maxBombs = 5;
    }
  }
  const SQRT_N_Tiles = Math.sqrt(gridTiles);
  // const frameSize = MIN_TILE_SIZE * (SQRT_N_Tiles + 1) + GAP * SQRT_N_Tiles;

  // State
  const [tilesData, setTilesData] = useState<TtileData[][]>([]);
  const [sumsOfRow, setSumsOfRow] = useState<number[]>([]);
  const [sumsOfCol, setSumsOfCol] = useState<number[]>([]);
  const [bombsInRow, setBombsInRow] = useState<number[]>([]);
  const [bombsInCol, setBombsInCol] = useState<number[]>([]);
  const [score, setScore] = useState<number>(1);
  // Bomb spark trigger: increment when bombFound becomes true
  const [bombSparkTrigger, setBombSparkTrigger] = useState(0);

  // Board generation
  useEffect(() => {
    // Generate flat array with bombs and numbers
    const totalTiles = gridTiles;
    const bombs = Array(maxBombs).fill(0);
    const nonBombTiles = totalTiles - maxBombs;
    // 1s always fill 60%
    const n1 = Math.floor(nonBombTiles * 0.6);
    // 3s never exceed 20% and never drop below 10%
    const min3 = Math.ceil(nonBombTiles * 0.1);
    const max3 = Math.floor(nonBombTiles * 0.2);
    // 3s: random between min3 and max3
    let n3 = Math.floor(Math.random() * (max3 - min3 + 1)) + min3;
    if (n3 > nonBombTiles - n1) n3 = nonBombTiles - n1; // can't exceed available tiles
    const n2 = nonBombTiles - n1 - n3;
    const nonBombValues = [
      ...Array(n3).fill(3),
      ...Array(n2).fill(2),
      ...Array(n1).fill(1),
    ];
    shuffle(nonBombValues);
    const allTiles = shuffle([...bombs, ...nonBombValues]);
    // Build 2D grid
    const newTilesData: TtileData[][] = [];
    for (let i = 0; i < SQRT_N_Tiles; i++) {
      newTilesData.push(
        allTiles
          .slice(i * SQRT_N_Tiles, (i + 1) * SQRT_N_Tiles)
          .map((value: number) => ({
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
  }, [level, gridTiles]);

  // Reveal all tiles when game is over or won
  useEffect(() => {
    if (bombFound || win) {
      setTilesData((prev) =>
        prev.map((row) => row.map((tile) => ({ ...tile, isFlipped: true })))
      );
    }
  }, [bombFound, win]);

  // HINT: Reveal a random safe, unrevealed tile when triggerHint changes
  useEffect(() => {
    if (!triggerHint) return; // skip on mount
    if (bombFound || win) return;
    // Find all safe, unrevealed tiles
    const safeTiles: { row: number; col: number }[] = [];
    tilesData.forEach((rowArr, rowIdx) => {
      rowArr.forEach((tile, colIdx) => {
        if (tile.value !== 0 && !tile.isFlipped) {
          safeTiles.push({ row: rowIdx, col: colIdx });
        }
      });
    });
    if (safeTiles.length === 0) return;
    // Pick a random safe tile
    const pick = safeTiles[Math.floor(Math.random() * safeTiles.length)];
    // Flip it
    setTilesData((prev) =>
      prev.map((row, i) =>
        row.map((tile, j) =>
          i === pick.row && j === pick.col ? { ...tile, isFlipped: true } : tile
        )
      )
    );
    // Update score if needed
    const tileVal = tilesData[pick.row][pick.col]?.value;
    if (tileVal && tileVal > 1) {
      setScore((prev) => {
        const newScore = prev * tileVal;
        onScoreChange(newScore);
        return newScore;
      });
    }
  }, [triggerHint]);

  // Progress update: count high-value tiles remaining
  const lastProgress = React.useRef<{ remaining: number; total: number }>({
    remaining: -1,
    total: -1,
  });
  useEffect(() => {
    if (!onProgressUpdate) return;
    const allHighValue = tilesData.flat().filter((t) => t.value > 1);
    const revealedHighValue = tilesData
      .flat()
      .filter((t) => t.value > 1 && t.isFlipped);
    const remaining = allHighValue.length - revealedHighValue.length;
    const total = allHighValue.length;
    if (
      lastProgress.current.remaining !== remaining ||
      lastProgress.current.total !== total
    ) {
      lastProgress.current = { remaining, total };
      onProgressUpdate(remaining, total);
    }
  }, [tilesData, onProgressUpdate]);

  // Bomb spark trigger: increment when bombFound becomes true
  useEffect(() => {
    if (bombFound) setBombSparkTrigger((t) => t + 1);
  }, [bombFound]);

  // Tile flip logic
  const flipCard = (rowIndex: number, colIndex: number) => {
    if (
      tilesData[rowIndex][colIndex].isFlipped ||
      bombFound ||
      win ||
      gridLocked
    )
      return;
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
      onBombFound();
      return;
    }
    setScore((prev) => {
      const newScore = prev * (tile.value || 1);
      onScoreChange(newScore);
      return newScore;
    });
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
        onLevelComplete(score * (tile.value || 1));
      }
    }, 0);
  };

  // Build a true (N+1)x(N+1) grid as a flat array
  const gridCells = [];
  for (let row = 0; row < SQRT_N_Tiles + 1; row++) {
    for (let col = 0; col < SQRT_N_Tiles + 1; col++) {
      if (row === 0 && col === 0) {
        gridCells.push(<div key="empty" />);
      } else if (row === 0) {
        gridCells.push(
          <HintTiles
            key={`col-hint-${col - 1}`}
            values={[sumsOfCol[col - 1]]}
            bombs={[bombsInCol[col - 1]]}
          />
        );
      } else if (col === 0) {
        gridCells.push(
          <HintTiles
            key={`row-hint-${row - 1}`}
            values={[sumsOfRow[row - 1]]}
            bombs={[bombsInRow[row - 1]]}
          />
        );
      } else {
        const tile = tilesData[row - 1]?.[col - 1];
        gridCells.push(
          <TileButton
            key={`${row - 1}-${col - 1}`}
            value={tile?.value}
            flipCard={() => !tile?.isFlipped && flipCard(row - 1, col - 1)}
            cardFlipped={tile?.isFlipped}
            lastTile={gridTiles}
            disabled={gridLocked}
            bombSparkTrigger={bombSparkTrigger}
          />
        );
      }
    }
  }

  console.log(SQRT_N_Tiles);
  return (
    <div
      className={cn(
        "grid scale-[0.55]    md:scale-100  aspect-square font-comfortaa w-full max-w-[430px] max-h-[70vw] sm:max-h-[430px] mx-auto",
        {
          // "-translate-x-4 md:-translate-x-0": SQRT_N_Tiles === 4,
          "-translate-x-10 -translate-y-10 md:-translate-x-11":
            SQRT_N_Tiles === 5,
          "-translate-x-[4rem] -translate-y-10 md:-translate-x-24":
            SQRT_N_Tiles === 6,
        }
      )}
      style={{
        gridTemplateColumns: `repeat(${SQRT_N_Tiles + 1}, 1fr)`,
        gridTemplateRows: `repeat(${SQRT_N_Tiles + 1}, 1fr)`,
        gap: `${GAP}px`,
      }}
    >
      {gridCells}
    </div>
  );
};

export default GameGrid;
