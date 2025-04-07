import { css } from "@emotion/react";

type Props = {
  className?: string;
  icon?: React.ReactNode;
  iconLocation?: "start" | "end";
  iconGap?: string;
  text?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  icon,
  iconLocation = "end",
  iconGap = "0.2em",
  text = "Button",
  ...rest
}: Props) {
  return (
    <button
      css={wrapperStyle}
      style={{
        flexDirection: `${iconLocation === "end" ? "row-reverse" : "row"}`,
        gap: `${iconGap}`,
      }}
      {...rest}
    >
      {icon} <span>{text}</span>
    </button>
  );
}

const wrapperStyle = css`
  display: flex;

  justify-content: center;
  align-items: center;
  background-color: #15e087;
  color: white;
  border-radius: 8px;
  padding: 10px 10px;
  cursor: pointer;
  user-select: none;

  :active {
    transform: scale(0.96);
  }
`;
