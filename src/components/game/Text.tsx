import { css } from "@emotion/react";
import { Vector2 } from "../../common/types";
import { coordinateToPosition } from "../../common/utils";
import { Theme } from "../../common/theme";

type Props = {
  coord: Vector2;
  dist: number;
};

export default function Text({ coord, dist }: Props) {
  const text = dist === Infinity ? null : dist;
  const position = coordinateToPosition(coord);
  return (
    <>
      {text && (
        <text
          transform={`translate(${position.x}, ${position.y})`}
          css={textStyle}
          x="32"
          y="32"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={Theme.tileColors.tileText}
        >
          {text}
        </text>
      )}
    </>
  );
}

const textStyle = css`
  font-size: 24px;
  color: "#027051";
  pointer-events: none;
  user-select: none;
  letter-spacing: 3px;
`;
