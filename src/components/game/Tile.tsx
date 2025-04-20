import { memo } from "react";
import { Vector2 } from "../../common/types";
import { useGameStore } from "../../stores/mainStore";
import { css } from "@emotion/react";
import { Theme } from "../../common/theme";
import { coordinateToPosition } from "../../utils/positionUtils";

export type TileType = "floor" | "wall";

export type TileState = [
  "current" | "queued" | "unVisited" | "visited",
  "neighbor" | "notNeighbor"
];

export type TileData = {
  coord: Vector2;
  dist: number;
  state: TileState;
  type: TileType;
};

type TileProps = { coord: Vector2 };

function Tile({ coord }: TileProps) {
  const map = useGameStore((state) => state.map);
  const setMap = useGameStore((state) => state.setMap);
  const triggerUpdate = useGameStore((state) => state.triggerUpdate);
  const data = map[coord.x][coord.y];
  const color =
    data.type === "wall"
      ? Theme.tileColors["wall"]
      : Theme.tileColors[data.state[0]];

  function handleClick() {
    const newType = data.type === "floor" ? "wall" : "floor";
    if (newType !== data.type) {
      map[coord.x][coord.y].type = newType;
      setMap([...map]);
      triggerUpdate(1);
    }
  }
  const position = coordinateToPosition(coord);

  return (
    <>
      <rect
        css={style}
        id="tile"
        width="64"
        height="64"
        fill={color}
        transform={`translate(${position.x}, ${position.y})`}
        onClick={handleClick}
      />
      {data.state[1] === "neighbor" && (
        <rect
          id="stroke"
          x="2"
          y="2"
          width="60"
          height="60"
          stroke={Theme.tileColors.neighbor}
          strokeWidth="6"
          fill="none"
          transform={`translate(${position.x}, ${position.y})`}
        />
      )}
    </>
  );
}

const style = css`
  cursor: pointer;
`;

export default memo(Tile);
