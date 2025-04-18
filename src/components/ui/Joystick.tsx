import { css } from "@emotion/react";
import Button from "./Button";
import { Theme } from "../../common/theme";
import { ReactNode } from "react";

type Props = {
  centerIcon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  labels: [ReactNode, ReactNode, ReactNode, ReactNode];
};

export default function Joystick({
  centerIcon,
  className,
  style,
  labels,
}: Props) {
  return (
    <div style={style} css={wrapperStyle} className={className}>
      <Button css={buttonStyle(1, 2)}>{labels[0]}</Button>
      <Button css={buttonStyle(2, 1)}>{labels[1]}</Button>
      <Button css={buttonStyle(2, 3)}>{labels[2]}</Button>
      <Button css={buttonStyle(3, 2)}>{labels[3]}</Button>
      <div css={centerIconStyle}>{centerIcon}</div>
    </div>
  );
}

const wrapperStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
`;

const radius = "5px";
const buttonStyle = (row: number, col: number) => css`
  grid-row: ${row};
  grid-column: ${col};
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${Theme.colors.brightGreen};
  border-radius: 5px;
  color: ${Theme.colors.black_1};
  font-family: "inter";
  border-bottom-left-radius: ${(row === 1 && col === 2) ||
  (row === 2 && col === 3)
    ? "0px"
    : `${radius}`};
  border-bottom-right-radius: ${(row === 1 && col === 2) ||
  (row === 2 && col === 1)
    ? "0px"
    : `${radius}`};
  border-top-left-radius: ${(row === 2 && col === 3) || (row === 3 && col === 2)
    ? "0px"
    : `${radius}`};
  border-top-right-radius: ${(row === 2 && col === 1) ||
  (row === 3 && col === 2)
    ? "0px"
    : `${radius}`};

  :hover {
    box-shadow: 0px 0px 20px 2px ${Theme.colors.brightGreenTransp};
  }
`;

const centerIconStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 2;
  grid-column: 2/3;

  svg {
    width: 80%;
    height: 80%;
  }
`;
