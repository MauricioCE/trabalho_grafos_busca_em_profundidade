import GhostTexture from "../../assets/svgs/ghost.svg?react";
import { memo } from "react";
import { useGameStore } from "../../stores/mainStore";
import { MovementKeys } from "../../common/types";
import Actor from "./Actor";

const moveKeys: MovementKeys = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
};

function Ghost() {
  const coord = useGameStore((state) => state.ghostCoord);
  const setStoreCoord = useGameStore((state) => state.setGhostCoord);

  return (
    <Actor
      coord={coord}
      texture={<GhostTexture />}
      movKeys={moveKeys}
      onMovement={setStoreCoord}
    />
  );
}

export default memo(Ghost);
