import { css } from "@emotion/react";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children = "Button", ...rest }: Props) {
  return (
    <button css={wrapperStyle} {...rest}>
      {children}
    </button>
  );
}

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  user-select: none;

  :active {
    transform: scale(0.96);
  }
`;
