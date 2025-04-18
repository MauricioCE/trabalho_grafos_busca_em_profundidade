import { css } from "@emotion/react";

export default function StepsText({
  steps,
  maxSteps,
}: {
  steps: number;
  maxSteps: number;
}) {
  return (
    <span css={style}>
      <span>{steps}</span>
      <span>/</span>
      <span>{maxSteps}</span>
    </span>
  );
}

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  font-size: clamp(0.9rem, 3vw, 0.9rem);
  font-weight: 600;
  font-family: "Roboto Mono";
`;
