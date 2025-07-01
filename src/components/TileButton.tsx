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
  bombFound: boolean;
  // tilePx?: number;
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
  bombFound,
}: // borderTiles,
// tilePx = 60,
TTileButton) {
  return (
    <button
      disabled={cardFlipped}
      className={`
        w-full h-full
        flex items-center justify-center
        text-5xl sm:text-6xl font-extrabold
        rounded-2xl shadow-lg border-4
        transition-all duration-200
        select-none
        ${
          cardFlipped || bombFound
            ? value === 0
              ? "bg-error border-error text-white scale-95"
              : "bg-base-200 border-primary text-primary-content scale-95"
            : "bg-accent border-accent-content text-accent-content hover:bg-accent-focus hover:scale-105"
        }
        ${cardFlipped ? "" : "cursor-pointer"}
      `}
      onClick={() => {
        if (value === 0) {
          setBombFound(true);
        }
        flipCard();
      }}
    >
      {cardFlipped || bombFound ? (
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
