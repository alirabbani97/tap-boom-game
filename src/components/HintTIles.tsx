// import { HiOutlineFire } from "react-icons/hi";

type THintTiles = {
  values: number[];
  bombs: number[];
  horizontal?: boolean;
};

const HintTiles = ({ values, bombs }: THintTiles) => {
  // Only ever render one tile per instance
  const value = Number.isFinite(values[0]) ? values[0] : 0;
  const bomb = Number.isFinite(bombs[0]) ? bombs[0] : 0;
  return (
    <div className="card w-full h-full bg-lavender shadow-[0_4px_0_0_#C1C8E4,0_8px_24px_0_rgba(88,128,233,0.10)] rounded-xl flex flex-col items-center justify-center p-2 transition-all duration-200 animate-tile-float">
      <span className="badge bg-primaryblue text-white text-lg font-extrabold mb-1 px-4 py-2 rounded-full">
        {value}
      </span>
      <span className="badge bg-purple text-white text-md font-bold px-3 py-1 rounded-full flex items-center gap-1">
        <span className="text-lg">💣</span> {bomb}
      </span>
    </div>
  );
};
export default HintTiles;
