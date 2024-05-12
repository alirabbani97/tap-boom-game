import { ReactNode } from "react";
type TTilesGrid = {
  gridCols: string ;
  children:ReactNode
};

export default function TileGrids({ children,gridCols}: TTilesGrid) {

  const gridSize= `grid-cols-${gridCols}`
  
  return (
    <div className={`grid ${gridSize} bg-orange-300 rounded-md p-5 gap-3 ` }>
     {children}
    </div>
  );
}
