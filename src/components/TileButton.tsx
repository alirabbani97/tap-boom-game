import { FaFlag } from "react-icons/fa";

type TTileButton = {
  // lastCol: number[];
  // lastRow: number[];
  borderTiles?: number[];
  lastTile: number;
  flipCard: () => void;
  flagCard: () => void;
  cardFlipped: boolean | undefined;
  cardFlagged: boolean | undefined;
  value: number | null;
  index: number;
  setBombFound: (arg: boolean) => void;
  bombFound: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function TileButton({
  // lastCol,
  // lastRow,
  // lastTile,
  // index,
  value,
  flipCard,
  flagCard,
  cardFlipped,
  cardFlagged,
  setBombFound,
  bombFound,
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
        if(!cardFlagged){
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
        }}
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        flagCard();
        console.log("right clicked tile")
      }}
    >
      {cardFlipped || bombFound ? `${value}` : cardFlagged ? <FaFlag size={40} color="red"/> : "?"}
      
    </button>
  );
}
