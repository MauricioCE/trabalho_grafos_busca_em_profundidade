import PacmanTexture from "../../assets/svgs/pacman.svg?react";
import { memo } from "react";
import { useGameStore } from "../../stores/mainStore";
import { MovementKeys } from "../../common/types";
import Actor from "./Actor";

const moveKeys: MovementKeys = { up: "w", down: "s", left: "a", right: "d" };

function Pacman() {
  const coord = useGameStore((state) => state.pacmanCoord);
  const setStoreCoord = useGameStore((state) => state.setPacmanCoord);

  return (
    <Actor
      coord={coord}
      texture={<PacmanTexture />}
      movKeys={moveKeys}
      onMovement={setStoreCoord}
    />
  );
}

export default memo(Pacman);
