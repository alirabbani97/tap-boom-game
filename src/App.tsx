import { useEffect, useState } from "react";
import TileGrids from "./components/TileGrids";
import TileButton from "./components/TileButton";
import HintTiles from "./components/HintTIles";
import LevelSlider from "./components/LevelSlider";

type TtileData = {
  value: number;
  isFlipped?: boolean | undefined;
};

function App() {
  /* VARIABLES */
  const [nTiles, setNTiles] = useState<number>(16); //Can only be a true square root number and equal or greater than 16 i.e:16(4),25(5),36(6),49(7),64(8),9(81) etc.
  const SQRT_N_Tiles: number = Math.sqrt(nTiles);
  const [score, setScore] = useState<number>(1);
  const [bombFound, setBombFound] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [tilesData, setTilesData] = useState<TtileData[][]>([]);
  const [sumsOfRow, setSumsOfRow] = useState<number[]>([]);
  const [sumsOfCol, setSumsOfCol] = useState<number[]>([]);
  const [bombsInRow, setBombsInRow] = useState<number[]>([]);
  const [bombsInCol, setBombsInCol] = useState<number[]>([]);
  const [restartKey, setRestartKey] = useState<number>(0);

  const numberOfBombs = SQRT_N_Tiles; // or scale as desired

  // Helper to shuffle an array
  function shuffle<T>(array: T[]): T[] {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  useEffect(() => {
    // Generate flat array with bombs and numbers
    const totalTiles = nTiles;
    const bombs = Array(numberOfBombs).fill(0);
    const numbers = Array(totalTiles - numberOfBombs)
      .fill(0)
      .map(() => Math.ceil(Math.random() * 3));
    const allTiles = shuffle([...bombs, ...numbers]);

    // Build 2D grid
    const newTilesData: TtileData[][] = [];
    for (let i = 0; i < SQRT_N_Tiles; i++) {
      newTilesData.push(
        allTiles
          .slice(i * SQRT_N_Tiles, (i + 1) * SQRT_N_Tiles)
          .map((value) => ({
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
  }, [nTiles, SQRT_N_Tiles, restartKey]);

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

    // Check win condition
    setTimeout(() => {
      const totalNonBombs = tilesData
        .flat()
        .filter((t) => t.value !== 0).length;
      const flippedNonBombs =
        tilesData.flat().filter((t) => t.value !== 0 && t.isFlipped).length + 1; // +1 for this flip
      if (flippedNonBombs >= totalNonBombs) {
        setWin(true);
      }
    }, 0);
  };

  const handleRestart = () => {
    setRestartKey((k) => k + 1);
  };

  /* CONSOLE LOGGING */
  useEffect(() => {
    console.log(bombsInRow);
  }, []);
  /* CONSOLE LOGGING */

  return (
    <div className="app flex flex-col justify-center items-center  h-screen w-screen bg-blue-100">
      {(bombFound || win) && (
        <div className="absolute w-screen h-screen z-50 bg-black/30 flex flex-col justify-start items-center ">
          <div
            className={`animate-slide-in-top duration-[1500ms] bg-white/100 p-10 rounded-lg border-4 border-${
              win ? "green" : "blue"
            }-500 flex flex-col items-center`}
          >
            <span
              className={`text-5xl font-bold ${
                win ? "text-green-600" : "text-blue-600"
              }`}
            >
              {win ? "You Win!" : "Game Over"}
            </span>
            <button
              className="mt-8 px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white text-2xl font-semibold rounded-lg shadow"
              onClick={handleRestart}
            >
              Restart
            </button>
          </div>
        </div>
      )}
      <div className="w-fit h-fit flex flex-col justify-center items-center ">
        <div className="flex justify-between items-center w-full">
          <LevelSlider gridSize={nTiles} setGridSize={setNTiles} />
          <div className="text-4xl ">
            Score: <span className="font-bold">{score}</span>
          </div>
        </div>

        {/* THE TILE BUTTONS */}

        <div className={`flex flex-col justify-center items-start `}>
          <div className={`flex justify-center items-center`}>
            <div>
              <TileGrids gridCols={SQRT_N_Tiles}>
                {tilesData.map((row, rowIndex) =>
                  row.map((tile, colIndex) => (
                    <TileButton
                      bombFound={bombFound}
                      key={`${rowIndex}-${colIndex}`}
                      setBombFound={setBombFound}
                      index={rowIndex + colIndex + 1}
                      value={tile.value}
                      flipCard={() =>
                        !tile.isFlipped && flipCard(rowIndex, colIndex)
                      }
                      cardFlipped={tile.isFlipped}
                      lastTile={nTiles}
                      setScore={setScore}
                    />
                  ))
                )}
              </TileGrids>
            </div>

            {/* THE TILE BUTTONS */}

            {/* THE HINT TILES  */}
            <div
              className={`flex flex-col bg-orange-300 rounded-md p-5 pl-3 rounded-l-none rounded-b-none  gap-3 `}
            >
              <HintTiles values={sumsOfRow} bombs={bombsInRow} />

              {/* {Array.from({ length: SQRT_N_Tiles }).map((tile, index) => (
                <HintTiles key={index} values={sumsOfRow} />
              ))} */}
            </div>
          </div>

          <div
            className={`flex bg-orange-300 rounded-md p-5 pt-0 rounded-t-none  gap-3 `}
          >
            <HintTiles values={sumsOfCol} bombs={bombsInCol} />
            {/* {Array.from({ length: SQRT_N_Tiles + 1 }).map((tile, index) => (
              <HintTiles
               
              
                values={sumsOfCol}
              />
            ))} */}
          </div>
          {/* THE HINT TILES  */}
        </div>
      </div>
    </div>
  );
}

export default App;
