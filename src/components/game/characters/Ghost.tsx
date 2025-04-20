import GhostTexture from "../../../assets/svgs/ghost.svg?react";
import { memo, useRef } from "react";
import Character from "./Character";
import { useGameStore } from "../../../stores/mainStore";
import { ghostMoveKeys } from "../../../common/moveKeysConsts";
import useHandleMovement from "../../../hooks/movementHooks";

const moveKeys = ghostMoveKeys;

function Ghost() {
  const coord = useGameStore((state) => state.ghostCoord);
  const setCoord = useGameStore((state) => state.setGhostCoord);
  const canMove = useRef(true);
  const pressedKey = useGameStore((state) => state.pressedKey);

  useHandleMovement(canMove, coord, moveKeys, pressedKey, setCoord);

  return (
    <Character
      coord={coord}
      texture={<GhostTexture />}
      onAnimationEnded={() => (canMove.current = true)}
    />
  );
}

export default memo(Ghost);
