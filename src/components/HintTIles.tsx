import { HiOutlineFire } from "react-icons/hi";

type THintTiles = {
  values: number[];
  bombs: number[];
  horizontal?: boolean;
};

const HintTiles = ({ values, bombs }: THintTiles) => {
  // Only ever render one tile per instance
  const value = values[0];
  const bomb = bombs[0];
  return (
    <div className="card w-full h-full bg-base-200 shadow-md rounded-xl flex flex-col items-center justify-center p-2">
      <span className="badge badge-primary text-lg font-extrabold mb-1 px-4 py-2 rounded-full">
        {value}
      </span>
      <span className="badge badge-error text-md font-bold px-3 py-1 rounded-full flex items-center gap-1">
        <span className="text-lg">💣</span> {bomb}
      </span>
    </div>
  );
};
export default HintTiles;
