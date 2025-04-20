import { css } from "@emotion/react";
import Button from "./Button";
import { Theme } from "../../common/theme";
import { ReactNode } from "react";

type Labels = {
  center: ReactNode;
  up: ReactNode;
  down: ReactNode;
  left: ReactNode;
  right: ReactNode;
};

type Keys = {
  up: string;
  down: string;
  left: string;
  right: string;
};

type Props = {
  className?: string;
  style?: React.CSSProperties;
  labels: Labels;
  keys: Keys;
  onKeyPressed?: (key: string) => void;
};

export default function Joystick({
  className,
  style,
  labels,
  keys,
  onKeyPressed,
}: Props) {
  return (
    <div style={style} css={wrapperStyle} className={className}>
      <Button
        css={buttonStyle(1, 2)}
        onClick={() => onKeyPressed && onKeyPressed(keys.up)}
      >
        {labels.up}
      </Button>
      <Button
        css={buttonStyle(2, 1)}
        onClick={() => onKeyPressed && onKeyPressed(keys.left)}
      >
        {labels.left}
      </Button>
      <Button
        css={buttonStyle(2, 3)}
        onClick={() => onKeyPressed && onKeyPressed(keys.right)}
      >
        {labels.right}
      </Button>
      <Button
        css={buttonStyle(3, 2)}
        onClick={() => onKeyPressed && onKeyPressed(keys.down)}
      >
        {labels.down}
      </Button>
      <div css={centerIconStyle}>{labels.center}</div>
    </div>
  );
}

// STYLES =====================================================================================

const buttonBorderRadius = "5px";

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
    : `${buttonBorderRadius}`};
  border-bottom-right-radius: ${(row === 1 && col === 2) ||
  (row === 2 && col === 1)
    ? "0px"
    : `${buttonBorderRadius}`};
  border-top-left-radius: ${(row === 2 && col === 3) || (row === 3 && col === 2)
    ? "0px"
    : `${buttonBorderRadius}`};
  border-top-right-radius: ${(row === 2 && col === 1) ||
  (row === 3 && col === 2)
    ? "0px"
    : `${buttonBorderRadius}`};

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
