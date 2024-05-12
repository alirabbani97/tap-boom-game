import { useEffect, useState } from "react";
import TileGrids from "./components/TileGrids";
import TileButton from "./components/TileButton";

type TtileData = {
  value: number | null;
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
  const [borderTiles, setBorderTiles] = useState<number[]>([]);
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
        if (bombsAdded !== level1.numberOfBombs) {
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
        if (bonusesAdded !== level1.numberOfBonuses) {
          setBonusesAdded(bonusesAdded + 1);
          return 2;
        }
        break;

      case 3:
        if (bonusesAdded !== level1.numberOfBonuses) {
          setBonusesAdded(bonusesAdded + 1);
          return 3;
        }
        break;
    }

    return 1;
  };

  const [tilesData, setTilesData] = useState<TtileData[]>(
    Array.from({ length: nTiles }, (_, index) => {
      if (borderTiles.includes(index + 1)) {
        return { value: null };
      } else {
        return { value: tileRNG(), isFlipped: false };
      }
    })
  );

  const flipCard = (index: number) => {
    setTilesData((prevTilesData) =>
      prevTilesData.map((tile, i) =>
        i === index ? { ...tile, isFlipped: true } : tile
      )
    );

    setFlippedTiles(flippedTiles + 1);
  };

  // const [lastCol, setLastCol] = useState<number[]>([]);
  // const [lastRow, setLastRow] = useState<number[]>([]);

  useEffect(() => {
    console.log(tilesData);
    let lastColTemp: number[] = [];
    let lastRowTemp: number[] = [];

    if (nTiles % SQRT_N_Tiles === 0) {
      // const lastCol: number = SQRT_N_Tiles;

      lastColTemp = Array.from(
        {
          length: SQRT_N_Tiles - 1,
        },
        (_, index) => SQRT_N_Tiles * (index + 1)
      );

      lastRowTemp = Array.from(
        {
          length: SQRT_N_Tiles,
        },
        (_, index) => nTiles - SQRT_N_Tiles + (index + 1)
      );
      // setLastRow(lastRowTemp);
      // setLastCol(lastColTemp);
      setBorderTiles([...lastColTemp, ...lastRowTemp]);
      console.log(borderTiles);
    } else {
      console.log({
        message:
          "nTiles or Number of Tiles should be a true square root\n and equal or greater than 25 \ni.e: 25(5),36(6),49(7),64(8),9(81).",
      });
    }
  }, [nTiles, SQRT_N_Tiles, tilesData]);

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
        <TileGrids gridCols={SQRT_N_Tiles.toString()}>
          {tilesData.map((tile, index) => (
            <TileButton
              // lastCol={lastCol}
              // lastRow={lastRow}
              key={index}
              setBombFound={setBombFound}
              index={index + 1}
              value={tile.value}
              flipCard={() => !tile.isFlipped && flipCard(index)}
              cardFlipped={tile.isFlipped}
              borderTiles={borderTiles}
              lastTile={nTiles}
              setScore={setScore}
            />
          ))}
        </TileGrids>
      </div>
    </div>
  );
}

export default App;
