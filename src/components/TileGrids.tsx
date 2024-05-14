import { ReactNode } from "react";
type TTilesGrid = {
  gridCols: number;
  children: ReactNode;
};

export default function TileGrids({ children, gridCols }: TTilesGrid) {
  // const gridSize= `grid-cols-${gridCols}`
  const gridSize = `repeat(${gridCols}, minmax(0, 1fr))`;

  return (
    <div
      className={`grid bg-orange-300 rounded-md rounded-r-none rounded-b-none p-5 pr-0 gap-3`}
      style={{ gridTemplateColumns: gridSize }}
    >
      {children}
    </div>
  );
}
