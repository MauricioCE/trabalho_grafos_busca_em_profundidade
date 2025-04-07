import { memo } from "react";
import Tile from "../Tile";
import { useGameStore } from "../../../stores/mainStore";

function TilesLayer() {
  const map = useGameStore((state) => state.map);

  return (
    <g id="tiles_layer">
      {map.map((row, rowIndex) =>
        row.map((obj, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} coord={obj.coord} />
        ))
      )}
    </g>
  );
}

export default memo(TilesLayer);
