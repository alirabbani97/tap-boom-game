import React from "react";

type THintTiles = {
  values: number[];
};

const HintTiles = (({ values }: THintTiles) => {
  console.log("Rendering HintTiles");
  return (
    <>
      {values.map((value: number, index: number) => (
        <button
          key={index}
          className=" bg-blue-700 flex items-center justify-center text-6xl font-bold rounded-md w-32 h-32 select-none"
        >
          <span className="text-green-500">{value}</span> <span>/</span>{" "}
          <span className="text-red-500">4</span>
        </button>
      ))}
    </>
  );
});
export default HintTiles;
