import { css } from "@emotion/react";
import Pacman from "./Pacman";
import Ghost from "./Ghost";
import { TileData } from "./Tile";
import { Theme } from "../../common/theme";
import TilesLayer from "./layers/TilesLayer";
import PathLayer from "./layers/PathLayer";
import TextLayer from "./layers/TextLayer";
import { useGameStore } from "../../stores/mainStore";
import { useMemo } from "react";
import BFS from "./BFS";
import { Size, Vector2 } from "../../common/types";

export type GameMap = TileData[][];

export type GameMapData = {
  map: GameMap;
  size: Size;
  pacmanCoord: Vector2;
  ghostCoord: Vector2;
};

type Props = {
  className?: string;
  stage: string[];
};

const tileSize = Theme.map.tileSize;
const tileGap = Theme.map.tileGap;

export default function Map({ stage, ...rest }: Props) {
  const setMap = useGameStore((state) => state.setMap);
  const setMapSize = useGameStore((state) => state.setMapSize);
  const setPacmanCoord = useGameStore((state) => state.setPacmanCoord);
  const setGhostCoord = useGameStore((state) => state.setGhostCoord);
  const mapData = useMemo(() => {
    const data = generateMapData(stage);
    setMap(data.map);
    setMapSize(data.size);
    setPacmanCoord(data.pacmanCoord);
    setGhostCoord(data.ghostCoord);
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return (
    <div css={wrapperStyle} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${mapData.size.width - Theme.map.tileGap} ${
          mapData.size.height - Theme.map.tileGap
        }`}
        preserveAspectRatio="xMidYMin meet"
      >
        <BFS />
        <rect width="100%" height="100%" fill={Theme.tileColors.gapColor} />
        <TilesLayer />
        <PathLayer />
        <TextLayer />
        <Pacman />
        <Ghost />
      </svg>
    </div>
  );
}

// FUNCTIONS =====================================================================================

function generateMapData(stage: string[]): GameMapData {
  enum EntityID {
    FLOOR = ".",
    GHOST = "g",
    PACMAN = "p",
    WALL = "x",
  }
  const map: TileData[][] = [];
  const mapHeight = stage.length;
  const pacmanCoord: Vector2 = { x: -1, y: -1 };
  const ghostCoord: Vector2 = { x: -1, y: -1 };
  let mapWidth = 0;

  stage.forEach((rowStr, rowIndex) => {
    const row = rowStr.split(" ");

    if (row.length > mapWidth) mapWidth = row.length;

    row.forEach((char, colIndex) => {
      if (map[colIndex] === undefined) map[colIndex] = [];
      const coord = { x: colIndex, y: rowIndex };
      char = char.toLowerCase();

      if (char === EntityID.PACMAN) {
        pacmanCoord.x = coord.x;
        pacmanCoord.y = coord.y;
      } else if (char === EntityID.GHOST) {
        ghostCoord.x = coord.x;
        ghostCoord.y = coord.y;
      }

      map[colIndex].push({
        state: ["unVisited", "notNeighbor"],
        type: char === EntityID.WALL ? "wall" : "floor",
        coord: { x: colIndex, y: rowIndex },
        dist: Infinity,
      });
    });
  });

  return {
    map: map,
    size: {
      width: mapWidth * tileSize + mapWidth * tileGap,
      height: mapHeight * tileSize + mapHeight * tileGap,
    },
    pacmanCoord: pacmanCoord,
    ghostCoord: ghostCoord,
  };
}

// STYLES =====================================================================================

const wrapperStyle = css`
  width: 100%;
  height: 100%;
`;
