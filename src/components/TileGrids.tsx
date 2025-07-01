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
      className="grid bg-base-100 rounded-3xl p-4 gap-4 shadow-lg border-2 border-primary"
      style={{ gridTemplateColumns: gridSize }}
    >
      {children}
    </div>
  );
}
