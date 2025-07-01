import { HiOutlineFire } from "react-icons/hi";

type THintTiles = {
  values: number[];
  bombs: number[];
  horizontal?: boolean;
  tileSize?: string;
};

const HintTiles = ({
  values,
  bombs,
  horizontal = false,
  tileSize = "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32",
}: THintTiles) => {
  return (
    <div className={`flex ${horizontal ? "flex-row" : "flex-col"} gap-3`}>
      {values.map((value: number, index: number) => (
        <div
          key={index}
          className={`card ${tileSize} bg-base-200 shadow-md rounded-xl flex flex-col items-center justify-center p-2`}
        >
          <span className="badge badge-primary text-lg font-extrabold mb-1 px-4 py-2 rounded-full">
            {value}
          </span>
          <span className="badge badge-error text-md font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-lg">💣</span> {bombs[index]}
          </span>
        </div>
      ))}
    </div>
  );
};
export default HintTiles;
