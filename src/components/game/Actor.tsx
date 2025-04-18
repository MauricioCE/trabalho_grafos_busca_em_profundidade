import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { MovementKeys, Vector2 } from "../../common/types";
import { clamp, coordinateToPosition } from "../../common/utils";
import { motion } from "motion/react";
import { useGameStore } from "../../stores/mainStore";

interface Props {
  coord: Vector2;
  texture: ReactNode;
  movKeys: MovementKeys;
  onMovement: (nextCoord: Vector2) => void;
}

export default function Actor({
  coord: coordProp,
  texture,
  movKeys,
  onMovement,
}: Props) {
  const [coord, setCoord] = useState<Vector2>(coordProp);
  const position = coordinateToPosition(coord);
  const canMove = useRef(false);

  useMovement(canMove, coord, setCoord, movKeys, onMovement);

  return (
    <motion.g
      initial={{
        translateX: `${position.x}px`,
        translateY: `${position.y}px`,
      }}
      animate={{
        translateX: `${position.x}px`,
        translateY: `${position.y}px`,
      }}
      transition={{ duration: 0.1 }}
      onAnimationComplete={() => {
        canMove.current = true;
      }}
    >
      {texture}
    </motion.g>
  );
}

function useMovement(
  canMove: RefObject<boolean>,
  coord: Vector2,
  setCoord: (coord: Vector2) => void,
  moveKeys: MovementKeys,
  onMovement: (nextCoord: Vector2) => void
) {
  useEffect(() => {
    function handleEvent(e: KeyboardEvent) {
      if (!canMove.current) return;
      const nextCoord = handleMovement(e.key, moveKeys, coord);
      if (nextCoord !== coord) {
        setCoord(nextCoord);
        onMovement(nextCoord);
        canMove.current = false;
      }
    }

    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, [canMove, coord, moveKeys, onMovement, setCoord]);
}

function handleMovement(
  pressedKey: string,
  keys: MovementKeys,
  coord: Vector2
) {
  const map = useGameStore.getState().map;
  let xIncrement = 0;
  let yIncrement = 0;

  switch (pressedKey) {
    case keys.up:
      yIncrement = -1;
      break;
    case keys.down:
      yIncrement = 1;
      break;
    case keys.left:
      xIncrement = -1;
      break;
    case keys.right:
      xIncrement = 1;
      break;
  }

  const newX = clamp(coord.x + xIncrement, 0, map.length);
  const newY = clamp(coord.y + yIncrement, 0, map[0].length);

  if (map[newX][newY].type !== "floor") return coord;
  if (newX === coord.x && newY === coord.y) return coord;

  return { x: newX, y: newY };
}
