import { css } from "@emotion/react";
import { Theme } from "../../common/theme";

type Props = {
  color: string;
  text: string;
  renderStroke?: boolean;
  renderText?: boolean;
  tileText?: string;
};

export default function LegendItem({
  color = "#0C134F",
  text,
  renderStroke = false,
  renderText = false,
}: Props) {
  return (
    <li css={itemStyle}>
      <svg>
        {tile(color)}
        {renderText && tileText}
        {renderStroke && stroke}
      </svg>
      <span css={legendStyle}>{text}</span>
    </li>
  );
}

const tile = (color: string) => (
  <rect width="100%" height="100%" fill={color} />
);

const tileText = (
  <text
    x="50%"
    y="55%"
    textAnchor="middle"
    dominantBaseline="middle"
    fill={Theme.tileColors.tileText}
  >
    1
  </text>
);

const stroke = (
  <rect
    width="100%"
    height="100%"
    fill="none"
    stroke={Theme.tileColors.neighbor}
    strokeWidth="6"
    strokeDashoffset={0}
  />
);

// STYLES =====================================================================================

const itemStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: ${Theme.colors.white_2};
  list-style: none;
`;

const legendStyle = css`
  font-size: 10px;
  user-select: none;
`;
