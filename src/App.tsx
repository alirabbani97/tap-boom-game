import { useState } from "react";
import TileGrids from "./components/TileGrids";
import TileButton from "./components/TileButton";

function App() {
  /* VARIABLES */

  const level1 = {
    numberOfTiles: 25,
    numberOfBombs: 5,
    numberOfBonuses: 5,
  };
  /* VARIABLES */
  /* STATES */

  const [tilesData, setTilesData] = useState(
    Array.from({ length: level1.numberOfTiles }, (_, index) => ({
      value: index,
      isFlipped: false,
    }))
  );
  const [flippedTiles, setFlippedTiles] = useState(0);
  // const [updatedTilesData,setUpdatedTilesData] = useState({...tilesData});

  /* STATES */

  const tileRNG = () => {
    const value = Math.random();
    return value;
  };
  const flipCard = (index: number) => {
    setTilesData((prevTilesData) =>
      prevTilesData.map((tile, i) =>
        i === index ? { ...tile, isFlipped: true } : tile
      )
    );
    // setTilesData({...updatedTilesData});

    setFlippedTiles(flippedTiles + 1);
  };

  return (
    <div className="app flex flex-col justify-center items-center  h-screen w-screen bg-blue-100">
      {flippedTiles === level1.numberOfTiles && (
        <div className="absolute w-screen h-screen z-50 bg-black/30 flex flex-col justify-center items-center ">
          <div className="animate-slide-in-top  duration-[1500ms]   bg-white p-10 rounded-lg border-4 border-blue-500">
            <span className="text-6xl font-bold">Game Over</span>
          </div>
        </div>
      )}
      <div className="text-6xl ">Tiles Flipped :{flippedTiles}</div>
      <TileGrids>
        {tilesData.map((tile, index) => (
          <TileButton
            key={index}
            value={tile.value}
            flipCard={() => !tile.isFlipped && flipCard(index)}
            cardFlipped={tile.isFlipped}
          />
        ))}
      </TileGrids>
    </div>
  );
}

export default App;
