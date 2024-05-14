type TTileButton = {
  // lastCol: number[];
  // lastRow: number[];
  borderTiles?: number[];
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
  // lastTile,
  // index,
  value,
  flipCard,
  cardFlipped,
  setBombFound,
  // borderTiles,
  setScore,
}: TTileButton) {
  

  return (
    <button
      disabled={cardFlipped}
      className={`
       ${
         cardFlipped ? "bg-zinc-500" : " bg-lime-200  hover:bg-lime-50"
       }  flex items-center justify-center  text-6xl font-bold rounded-md w-32 h-32 hover:cursor-pointer `}
      onClick={() => {
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
      }}
    >
      {value}
      {cardFlipped ? `${value}` : "?"}
    </button>
  );
}
