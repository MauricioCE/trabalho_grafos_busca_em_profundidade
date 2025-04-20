import PacmanTexture from "../../../assets/svgs/pacman.svg?react";
import Character from "./Character";
import { useGameStore } from "../../../stores/mainStore";
import { memo, useRef } from "react";
import useHandleMovement from "../../../hooks/movementHooks";
import { pacmanMoveKeys } from "../../../common/moveKeysConsts";

const moveKeys = pacmanMoveKeys;

function Pacman() {
  const coord = useGameStore((state) => state.pacmanCoord);
  const setCoord = useGameStore((state) => state.setPacmanCoord);
  const canMove = useRef(true);
  const pressedKey = useGameStore((state) => state.pressedKey);

  useHandleMovement(canMove, coord, moveKeys, pressedKey, setCoord);

  return (
    <Character
      coord={coord}
      texture={<PacmanTexture />}
      onAnimationEnded={() => (canMove.current = true)}
    />
  );
}

export default memo(Pacman);
