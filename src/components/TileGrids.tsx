import { ReactNode } from "react";
type TTilesGrid = {
  children:ReactNode
};

export default function TileGrids({ children}: TTilesGrid) {
  return (
    <div className="grid grid-cols-5 bg-orange-300 rounded-md p-5 gap-3">
     {children}
    </div>
  );
}
