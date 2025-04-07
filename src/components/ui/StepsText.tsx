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
  font-size: 1.2rem;
  font-weight: 600;
  font-family: "Roboto Mono";
`;
