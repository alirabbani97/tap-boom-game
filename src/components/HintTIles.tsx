import { useEffect, useState } from "react";

type THintTiles = {
  // lastCol: number[];
  // lastRow: number[];
  borderTiles?: number[];
  lastTile: number;
  tilesData: object[];
  // flipCard: () => void;
  // cardFlipped: boolean | undefined;
  value: number | null;
  index: number;
  SQRT_N_Tiles: number;
  // setBombFound: (arg: boolean) => void;
  // setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function HintTiles({
  lastTile,
  index,
  tilesData,
  borderTiles,
  SQRT_N_Tiles,
}: // setScore,
THintTiles) {
  
  const [rowBonuses, setRowBonuses] = useState(1);

  // useEffect(() => {
  //   let rowBonusesTemp = 0;
  //   console.log(tilesData[index])

  //   if(borderTiles.includes(index)){
  //     for(let i = index-1; i >= index-SQRT_N_Tiles; i--){
  //       rowBonusesTemp = rowBonusesTemp + tilesData[index].value
  //     }
  //   }  setRowBonuses(rowBonusesTemp)
  //   console.log(rowBonusesTemp)
  // }, [tilesData]);

  return (
    <button className=" bg-blue-700 flex items-center justify-center text-6xl font-bold rounded-md w-32 h-32 select-none">
      <span className="text-green-500">{rowBonuses}</span> <span>/</span>{" "}
      <span className="text-red-500">4</span>
    </button>
  );
}
