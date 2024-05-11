type TTileButton = {
  flipCard: () => void;
  cardFlipped: boolean;
  value: number;
  index: number;
};

export default function TileButton({
  index,
  value,
  flipCard,
  cardFlipped,
}: TTileButton) {
  const lastTileOfRows = index < 21 && index % 5;
  const lastRowIndices = [21, 22, 23, 24];
  const hintTiles =
    lastRowIndices.includes(index) || lastTileOfRows === 0 || index === 25;

  const hintTilesStyles =
    " bg-lime-200 flex items-center justify-center text-6xl font-bold rounded-md w-32 h-32 ";

  return (
    <div
      className={`
       ${
         hintTiles
           ? { hintTilesStyles }
           : `${
               cardFlipped ? "bg-zinc-500" : " bg-lime-200  hover:bg-lime-50"
             }  flex items-center justify-center  text-6xl font-bold rounded-md w-32 h-32 hover:cursor-pointer `
       }`}
      onClick={() => {
        !hintTiles && flipCard();
      }}
    >
      {hintTiles ? "5/5" : cardFlipped ? `${value}` : "?"}
    </div>
  );
}
