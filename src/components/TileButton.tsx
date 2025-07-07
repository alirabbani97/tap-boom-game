import React from "react";
import ClickSpark, { ClickSparkHandle } from "./ClickSpark";

type TTileButton = {
  // lastCol: number[];
  // lastRow: number[];
  borderTiles?: number[];
  lastTile: number;
  flipCard: () => void;
  // flagCard: () => void;
  cardFlipped: boolean | undefined;
  // cardFlagged: boolean | undefined;
  value: number | null;
  // index: number;
  disabled?: boolean;
  // tilePx?: number;
  bombSparkTrigger?: number;
};

export default function TileButton({
  // lastCol,
  // lastRow,
  // lastTile,
  value,
  flipCard,
  cardFlipped,
  disabled = false,
  bombSparkTrigger,
}: // borderTiles,
// tilePx = 60,
TTileButton) {
  // Ref to ClickSpark
  const sparkRef = React.useRef<ClickSparkHandle>(null);
  const lastBombSparkRef = React.useRef<number | undefined>(undefined);
  React.useEffect(() => {
    if (
      typeof bombSparkTrigger !== "undefined" &&
      value === 0 &&
      bombSparkTrigger !== lastBombSparkRef.current
    ) {
      // console.log('TileButton: calling triggerSpark for bomb at index', index);
      sparkRef.current?.triggerSpark();
      lastBombSparkRef.current = bombSparkTrigger;
    }
  }, [bombSparkTrigger, value]);

  return (
    <div className="w-full h-full" style={{ perspective: "600px" }}>
      <button
        disabled={cardFlipped || disabled}
        className={`relative w-full h-full flex items-center justify-center text-center text-5xl font-extrabold rounded-2xl transition-all duration-200 leading-none select-none bg-transparent border-none p-0 ${
          cardFlipped || disabled ? "" : "cursor-pointer"
        } animate-tile-float`}
        style={{}}
        onClick={flipCard}
        tabIndex={-1}
      >
        <div
          className="absolute inset-0 w-full h-full rounded-2xl"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.5s cubic-bezier(0.4,0.2,0.2,1)",
            transform: cardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center rounded-2xl bg-primaryblue border-2 border-primaryblue text-white [backface-visibility:hidden] shadow-[0_4px_0_0_#C1C8E4,0_8px_24px_0_rgba(88,128,233,0.10)]"
            style={{ zIndex: 2 }}
          >
            <span className="opacity-60">?</span>
          </div>
          {/* Back face */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center rounded-2xl [backface-visibility:hidden] shadow-[0_4px_0_0_#C1C8E4,0_8px_24px_0_rgba(88,128,233,0.10)] ${
              value === 0
                ? "bg-purple border-purple text-white"
                : "bg-green-200 border-green-400 text-green-900"
            } border-2`}
            style={{ transform: "rotateY(180deg)", zIndex: 3 }}
          >
            {value === 0 ? (
              <ClickSpark
                ref={sparkRef}
                sparkColor="red"
                sparkSize={27}
                sparkRadius={60}
                sparkCount={20}
                duration={1000}
                extraScale={1.2}
              >
                <span className="text-4xl">💣</span>
              </ClickSpark>
            ) : (
              value
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
