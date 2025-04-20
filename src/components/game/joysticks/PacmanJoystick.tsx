import Joystick from "../../ui/Joystick";
import PacmanTexture from "../../../assets/svgs/pacman.svg?react";
import { useGameStore } from "../../../stores/mainStore";
import { pacmanMoveKeys } from "../../../common/moveKeysConsts";

const moveKeys = pacmanMoveKeys;

export default function PacmanJoystick() {
  function handleJoystickInput(pressedKey: string) {
    useGameStore.getState().setPressedKey({ value: pressedKey });
  }

  return (
    <Joystick
      style={{ alignSelf: "center", maxWidth: "150px" }}
      labels={{
        center: <PacmanTexture />,
        up: "W",
        down: "S",
        left: "A",
        right: "D",
      }}
      keys={{
        up: moveKeys.up,
        down: moveKeys.down,
        left: moveKeys.left,
        right: moveKeys.right,
      }}
      onKeyPressed={handleJoystickInput}
    />
  );
}
