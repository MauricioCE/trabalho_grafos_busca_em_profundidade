import Joystick from "../../ui/Joystick";
import GhostTexture from "../../../assets/svgs/ghost.svg?react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useGameStore } from "../../../stores/mainStore";
import { ghostMoveKeys } from "../../../common/moveKeysConsts";

const moveKeys = ghostMoveKeys;

export default function GhostJoystick() {
  function handleJoystickInput(pressedKey: string) {
    useGameStore.getState().setPressedKey({ value: pressedKey });
  }

  return (
    <Joystick
      style={{ alignSelf: "center", maxWidth: "150px" }}
      labels={{
        center: <GhostTexture />,
        up: <FaArrowUp />,
        down: <FaArrowDown />,
        left: <FaArrowLeft />,
        right: <FaArrowRight />,
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
