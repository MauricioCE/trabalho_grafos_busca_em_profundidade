import { css } from "@emotion/react";
import { useGameStore } from "../../stores/mainStore";
import Button from "./Button";
import Slider from "./Slider";
import StepsText from "./StepsText";

type Props = {
  className?: string;
};

export default function Controls({ ...rest }: Props) {
  const steps = useGameStore((state) => state.steps);
  const maxSteps = useGameStore((state) => state.maxSteps);
  const setSteps = useGameStore((state) => state.setSteps);
  const setStepsBy = useGameStore((state) => state.setStepsBy);

  return (
    <div css={wrapperStyle} {...rest}>
      <span css={titleStyle}>Steps</span>
      <Slider
        min={0}
        max={maxSteps}
        step={1}
        onCallback={setSteps}
        value={steps > maxSteps ? maxSteps : steps}
      />
      <div css={buttonGroupStyle}>
        <Button
          css={buttonStyle}
          iconLocation="start"
          text="<<"
          onClick={() => setStepsBy(-1)}
        />
        <StepsText steps={steps} maxSteps={maxSteps} />
        <Button
          css={buttonStyle}
          iconLocation="end"
          text=">>"
          onClick={() => setStepsBy(1)}
        />
      </div>
    </div>
  );
}

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  color: white;
`;

const titleStyle = css`
  font-size: 1.3rem;
  font-weight: 500;
  font-family: "Roboto Mono";
`;

const buttonGroupStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const buttonStyle = css`
  min-width: 70px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #1f1f1f;
  border: none;
  :hover {
    box-shadow: 0px 0px 20px 2px #15e08863;
  }
`;
