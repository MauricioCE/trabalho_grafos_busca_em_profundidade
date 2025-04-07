import { css } from "@emotion/react";

type Props = {
  color: string;
  legend: string;
  renderStroke?: boolean;
  tileText?: string;
};

export default function LegendItem({
  color = "#0C134F",
  legend,
  renderStroke = false,
  tileText,
}: Props) {
  return (
    <li>
      <span css={legendStyle}>{legend}</span>

      <svg
        width="28"
        height="28"
        style={{ width: "max-content", height: "max-content" }}
      >
        <rect width="100%" height="100%" fill={color} />

        {renderStroke && (
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke="#259d7b"
            strokeWidth="5"
            strokeDasharray="5.6 5.6"
            strokeDashoffset={0}
          />
        )}
        {tileText && (
          <text
            css={textStyle}
            x="14"
            y="16"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#027051"
          >
            {tileText}
          </text>
        )}
      </svg>
    </li>
  );
}

const legendStyle = css`
  font-size: 1rem;
  user-select: none;
`;

const textStyle = css`
  font-size: 20px;
  font-weight: 600;
  user-select: none;
`;
