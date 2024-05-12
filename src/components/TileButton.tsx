type TTileButton = {
  // lastCol: number[];
  // lastRow: number[];
  borderTiles: number[];
  lastTile: number;
  flipCard: () => void;
  cardFlipped: boolean | undefined;
  value: number | null;
  index: number;
  setBombFound: (arg: boolean) => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
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
  setScore,
}: TTileButton) {
  // const lastTileOfRows = index < 21 && index % 5;
  // const lastRowIndices = [21, 22, 23, 24];
  const hintTiles = borderTiles.includes(index) || index === lastTile;

  const hintTilesStyles =
    " bg-lime-200 flex items-center justify-center text-6xl font-bold rounded-md w-32 h-32 select-none";

  return (
    <button
      disabled={cardFlipped}
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
          if (value === 0) {
            setBombFound(true);
          }
          flipCard();
          if (value !== 0 && value !== null) {
            setScore((prev: number) => {
              if (prev === 0) {
                return prev + value;
              } else {
                return prev * value;
              }
            });
          }
        }
      }}
    >
      {hintTiles ? "5/5" : cardFlipped ? `${value}` : "?"}
    </button>
  );
}
