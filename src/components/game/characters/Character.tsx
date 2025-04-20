import { ReactNode } from "react";
import { motion } from "motion/react";
import { Vector2 } from "../../../common/types";
import { coordinateToPosition } from "../../../utils/positionUtils";

interface Props {
  coord: Vector2;
  texture: ReactNode;
  onAnimationEnded: () => void;
}

export default function Character({ coord, texture, onAnimationEnded }: Props) {
  const position = coordinateToPosition(coord);

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
        onAnimationEnded();
      }}
    >
      {texture}
    </motion.g>
  );
}
