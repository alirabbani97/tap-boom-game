type TTileButton = {
  // lastCol: number[];
  // lastRow: number[];
  borderTiles: number[];
  lastTile: number;
  flipCard: () => void;
  cardFlipped: boolean;
  value: number;
  index: number;
  setBombFound: (arg: boolean) => void;
};

export default function TileButton({
  // lastCol,
  // lastRow,
  lastTile,
  index,
  value,
  flipCard,
  cardFlipped,
  setBombFound,
  borderTiles,
}: TTileButton) {
  // const lastTileOfRows = index < 21 && index % 5;
  // const lastRowIndices = [21, 22, 23, 24];
  const hintTiles = borderTiles.includes(index) || index === lastTile;

  const hintTilesStyles =
    " bg-lime-200 flex items-center justify-center text-6xl font-bold rounded-md w-32 h-32 select-none";

  return (
    <div
      className={`
       ${
         hintTiles
           ? hintTilesStyles
           : `${
               cardFlipped ? "bg-zinc-500" : " bg-lime-200  hover:bg-lime-50"
             }  flex items-center justify-center  text-6xl font-bold rounded-md w-32 h-32 hover:cursor-pointer `
       }`}
      onClick={() => {
        if (hintTiles !== true) {
          flipCard();
          if (value === 0) {
            setBombFound(true);
          }
        }
        
      }}
    >
      {hintTiles ? "5/5" : cardFlipped ? `${value}` : "?"}
    </div>
  );
}
