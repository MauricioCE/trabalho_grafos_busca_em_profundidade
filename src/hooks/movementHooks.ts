import { RefObject, useEffect } from "react";
import { MovementKeys, Vector2 } from "../common/types";
import { getNextCoord, isSamePosition } from "../utils/positionUtils";

export default function useHandleMovement(
  canMove: RefObject<boolean>,
  coord: Vector2,
  moveKeys: MovementKeys,
  pressedKey: { value: string },
  setCoord: (coord: Vector2) => void
) {
  useEffect(() => {
    const keysValues = Object.values(moveKeys);

    if (keysValues.includes(pressedKey.value)) {
      const nextCoord = getNextCoord(pressedKey.value, moveKeys, coord);

      if (!isSamePosition(nextCoord, coord) && canMove.current) {
        canMove.current = false;
        setCoord(nextCoord);
      }
    }
  }, [canMove, coord, moveKeys, pressedKey, setCoord]);
}
