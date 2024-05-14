import { useEffect, useState } from "react";
import TileGrids from "./components/TileGrids";
import TileButton from "./components/TileButton";
import HintTiles from "./components/HintTIles";

type TtileData = {
  value: number;
  isFlipped?: boolean | undefined;
};

function App() {
  /* VARIABLES */
  const [nTiles] = useState(25); //Can only be a true square root number and equal or greater than 16 i.e:16(4),25(5),36(6),49(7),64(8),9(81) etc.
  const SQRT_N_Tiles: number = Math.sqrt(nTiles);
  const [score, setScore] = useState<number>(0);
  const [bombFound, setBombFound] = useState<boolean>(false);
  const [bombsAdded, setBombsAdded] = useState(0);
  const [bonusesAdded, setBonusesAdded] = useState(0);
  const [flippedTiles, setFlippedTiles] = useState(0);
  // const [borderTiles, setBorderTiles] = useState<number[]>([]);
  // const hintTilesCount = SQRT_N_Tiles * 2 - 1 + 2;
  const level1 = {
    nTiles: nTiles,
    numberOfBombs: SQRT_N_Tiles,
    numberOfBonuses: 5,
  };

  /* VARIABLES */
  /* STATES */

  /* STATES */

  const tileRNG = (): number => {
    const rng = Math.floor(Math.random() * 4);

    switch (rng) {
      case 0:
        if (bombsAdded < level1.numberOfBombs) {
          setBombsAdded(bombsAdded + 1);
          return 0;
        }
        break;
      case 1:
        if (bonusesAdded === level1.numberOfBonuses) {
          return 1;
        }
        break;

      case 2:
        if (bonusesAdded < level1.numberOfBonuses) {
          setBonusesAdded(bonusesAdded + 1);
          return 2;
        }
        break;

      case 3:
        if (bonusesAdded < level1.numberOfBonuses) {
          setBonusesAdded(bonusesAdded + 1);
          return 3;
        }
        break;
    }

    return 1;
  };

  // const [tilesData, setTilesData] = useState<TtileData[]>(
  //   Array.from({ length: nTiles }, () => {
  //     return { value: tileRNG(), isFlipped: false };
  //   })
  // );
  const [tilesData, setTilesData] = useState<TtileData[][]>(
    Array.from({ length: SQRT_N_Tiles }, () =>
      Array.from({ length: SQRT_N_Tiles }, () => {
        return { value: tileRNG(), isFlipped: false };
      })
    )
  );

  const [sumsOfRow, setSumsOfRow] = useState<number[]>([]);

  useEffect(() => {
    let sumArr: number[] = [];
    for (const row of tilesData) {
      let sum = 0;
      for (const tile of row) {
        sum = sum + tile.value;
      }
      sumArr.push(sum);
    }
    setSumsOfRow(sumArr);
    console.log(sumsOfRow);
  }, [tilesData]);

  const flipCard = (rowIndex: number, colIndex: number) => {
    setTilesData((prevTilesData) =>
      prevTilesData.map((row, i) =>
        row.map((tile, j) =>
          i === rowIndex && j === colIndex ? { ...tile, isFlipped: true } : tile
        )
      )
    );

    setFlippedTiles(flippedTiles + 1);
  };

  /* CONSOLE LOGGING */
  useEffect(() => {
    console.log(tilesData);
    console.log(sumsOfRow);
  }, []);
  /* CONSOLE LOGGING */
  /* CALC THE HINT ROW AND COLS */
  // useEffect(() => {
  //   console.log(tilesData);
  //   let lastColTemp: number[] = [];
  //   let lastRowTemp: number[] = [];

  //   if (nTiles % SQRT_N_Tiles === 0) {
  //     // const lastCol: number = SQRT_N_Tiles;

  //     lastColTemp = Array.from(
  //       {
  //         length: SQRT_N_Tiles - 1,
  //       },
  //       (_, index) => SQRT_N_Tiles * (index + 1)
  //     );

  //     lastRowTemp = Array.from(
  //       {
  //         length: SQRT_N_Tiles,
  //       },
  //       (_, index) => nTiles - SQRT_N_Tiles + (index + 1)
  //     );

  //     setBorderTiles([...lastColTemp, ...lastRowTemp]);
  //     console.log(lastColTemp, lastRowTemp);
  //   } else {
  //     console.log({
  //       message:
  //         "nTiles or Number of Tiles should be a true square root\n and equal or greater than 25 \ni.e: 25(5),36(6),49(7),64(8),9(81).",
  //     });
  //   }
  // }, [nTiles, SQRT_N_Tiles, tilesData]);

  /* CALC THE HINT ROW AND COLS */

  return (
    <div className="app flex flex-col justify-center items-center  h-screen w-screen bg-blue-100">
      {bombFound && (
        <div className="absolute w-screen h-screen z-50 bg-black/30 flex flex-col justify-center items-center ">
          <div className="animate-slide-in-top  duration-[1500ms]   bg-white p-10 rounded-lg border-4 border-blue-500">
            <span className="text-6xl font-bold">Game Over</span>
          </div>
        </div>
      )}
      <div className="w-fit h-fit flex flex-col justify-center items-center ">
        <div className="text-6xl ">
          Score: <span className="font-bold">{score}</span>
        </div>
        {/* THE TILE BUTTONS */}

        <div className={`flex flex-col justify-center items-center `}>
          <div className={`flex justify-center items-center`}>
            {/* <div>
              <TileGrids gridCols={SQRT_N_Tiles}>
                {tilesData.map((row, rowIndex) =>
                row.map(tile, colIndex) => (
                  <TileButton
                    // lastCol={lastCol}
                    // lastRow={lastRow}
                    key={index}
                    setBombFound={setBombFound}
                    index={index + 1}
                    value={tile[index].value}
                    flipCard={() => !tile[index].isFlipped && flipCard(index)}
                    cardFlipped={tile[index].isFlipped}
                    lastTile={nTiles}
                    setScore={setScore}
                  />
                ))}
              </TileGrids>
            </div> */}
            <div>
              <TileGrids gridCols={SQRT_N_Tiles}>
                {tilesData.map((row, rowIndex) =>
                  row.map((tile, colIndex) => (
                    <TileButton
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
              {Array.from({ length: SQRT_N_Tiles }).map((tile, index) => (
                <HintTiles
                  // lastCol={lastCol}
                  // lastRow={lastRow}
                  tilesData={tilesData}
                  SQRT_N_Tiles={SQRT_N_Tiles}
                  key={index}
                  index={index + 1}
                  value={0}
                  lastTile={nTiles}
                />
              ))}
            </div>
          </div>

          <div
            className={`flex bg-orange-300 rounded-md p-5 pt-0 rounded-t-none  gap-3 `}
          >
            {Array.from({ length: SQRT_N_Tiles + 1 }).map((tile, index) => (
              <HintTiles
                // lastCol={lastCol}
                // lastRow={lastRow}
                tilesData={tilesData}
                SQRT_N_Tiles={SQRT_N_Tiles}
                key={index}
                index={index + 1}
                value={0}
                lastTile={nTiles}
              />
            ))}
          </div>
          {/* THE HINT TILES  */}
        </div>
      </div>
    </div>
  );
}

export default App;
