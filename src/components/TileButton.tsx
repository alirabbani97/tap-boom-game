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
  disabled?: boolean;
  // tilePx?: number;
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
  disabled = false,
}: // borderTiles,
// tilePx = 60,
TTileButton) {
  return (
    <button
      disabled={cardFlipped || disabled}
      className={`
        w-full h-full
        flex items-center justify-center
        text-center
        text-5xl  font-extrabold
        rounded-2xl
        shadow-[0_4px_0_0_#C1C8E4,0_8px_24px_0_rgba(88,128,233,0.10)]
        transition-all duration-200
        leading-none
        select-none
        ${
          cardFlipped
            ? value === 0
              ? "bg-purple border-purple text-white scale-95"
              : "bg-green-200 border-green-400 text-green-900 scale-95"
            : "bg-primaryblue border-primaryblue text-white hover:bg-lightblue hover:scale-105"
        }
        ${cardFlipped || disabled ? "" : "cursor-pointer"}
        animate-tile-float
      `}
      style={{
        boxShadow: "0 4px 0 0 #C1C8E4, 0 8px 24px 0 rgba(88,128,233,0.10)",
      }}
      onClick={flipCard}
    >
      {cardFlipped ? (
        value === 0 ? (
          <span className="text-4xl">💣</span>
        ) : (
          value
        )
      ) : (
        <span className="opacity-60">?</span>
      )}
    </button>
  );
}
