type TTileButton = {
  flipCard: () => void;
  cardFlipped: boolean;
  value: number;
};

export default function TileButton({
  value,
  flipCard,
  cardFlipped,
}: TTileButton) {
  return (
    <div
      className={`${
        cardFlipped ? "bg-zinc-500 " : " bg-lime-200  hover:bg-lime-50"
      } flex items-center justify-center  text-6xl font-bold rounded-md w-32 h-32 hover:cursor-pointer`}
      onClick={flipCard}
    >
      {cardFlipped ? `${value}` : "?"}
    </div>
  );
}
