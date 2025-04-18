import { css } from "@emotion/react";
import { useGameStore } from "../../stores/mainStore";
import Button from "./Button";
import Slider from "./Slider";
import StepsText from "./StepsText";
import { Theme } from "../../common/theme";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

type Props = {
  className?: string;
};

export default function StepControls({ ...rest }: Props) {
  const steps = useGameStore((state) => state.steps);
  const maxSteps = useGameStore((state) => state.maxSteps);
  const setSteps = useGameStore((state) => state.setSteps);
  const setStepsBy = useGameStore((state) => state.setStepsBy);

  return (
    <div css={wrapperStyle} {...rest}>
      <Slider
        height={10}
        min={0}
        max={maxSteps}
        step={1}
        onValueChange={setSteps}
        value={steps > maxSteps ? maxSteps : steps}
      />
      <div css={buttonGroupStyle}>
        <Button
          css={buttonStyle}
          children={<MdKeyboardDoubleArrowLeft />}
          onClick={() => setStepsBy(-1)}
        />
        <StepsText steps={steps} maxSteps={maxSteps} />
        <Button
          css={buttonStyle}
          children={<MdKeyboardDoubleArrowRight />}
          onClick={() => setStepsBy(1)}
        />
      </div>
    </div>
  );
}

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  color: white;
`;

const buttonGroupStyle = css`
  height: 5vh;
  max-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const buttonStyle = css`
  height: 100%;
  padding: 0px 30px;
  color: #1f1f1f;
  border: none;
  font-size: clamp(1rem, 3vw, 1rem);
  background-color: ${Theme.colors.brightGreen};

  :hover {
    box-shadow: 0px 0px 20px 2px ${Theme.colors.brightGreenTransp};
  }
`;
