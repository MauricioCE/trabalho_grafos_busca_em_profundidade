import { css } from "@emotion/react";
import { RefObject, useEffect, useRef, useState } from "react";
import { clamp } from "../../common/utils";

type Props = {
  min: number;
  max: number;
  step?: number;
  value?: number;
  onCallback?: (value: number) => void;
};

export default function Slider({
  step = 1,
  min: minValue,
  max: maxValue,
  value = 0,
  onCallback,
}: Props) {
  const [currentValue, setCurrentValue] = useState(value);
  const handleRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const intervalRange = maxValue - minValue;
  const maxStep = Math.max(1, Math.ceil(intervalRange / step));

  function getHandleX() {
    if (!railRef.current) return 0;
    const railWidth = railRef.current.getBoundingClientRect().width;
    return (railWidth * currentValue) / intervalRange;
  }

  function handleSliderInteraction(posX: number) {
    if (railRef.current) {
      const railRect = railRef.current.getBoundingClientRect();
      const railStep = (railRect.width * step) / intervalRange;
      const mouseX = posX - railRect.left;
      const leftSnapPointX = clamp(
        mouseX - (mouseX % railStep),
        0,
        railRect.width
      );
      const rightSnapPointX = clamp(
        mouseX + railStep - (mouseX % railStep),
        0,
        railRect.width
      );
      const distToLeftSnap = mouseX - leftSnapPointX;
      const distToRightSnap = rightSnapPointX - mouseX;
      const handleSnapX =
        distToRightSnap <= distToLeftSnap ? rightSnapPointX : leftSnapPointX;
      const nextValue = Math.round(
        clamp(
          minValue + (handleSnapX * intervalRange) / railRect.width,
          minValue,
          maxValue
        )
      );

      setCurrentValue(nextValue);

      if (onCallback) {
        onCallback(nextValue);
      }
    }
  }

  useValueMonitor(value, setCurrentValue);
  useSliderInteraction(railRef, handleRef, handleSliderInteraction, maxStep);

  return (
    <div css={wrapperStyle}>
      <div ref={railRef} css={railStyle} draggable="false"></div>
      <div css={trackStyle} style={{ left: `${getHandleX()}` }}></div>
      <div ref={handleRef} css={handlerStyle(getHandleX())} />
    </div>
  );
}

// HOOKS =====================================================================================

function useValueMonitor(
  value: number,
  setCurrentValue: (value: number) => void
) {
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
}

function useSliderInteraction(
  railRef: RefObject<HTMLDivElement | null>,
  handleRef: RefObject<HTMLDivElement | null>,
  handleSliderInteraction: (value: number) => void,
  maxStep: number
) {
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    function handleMouseDown(event: MouseEvent) {
      if (event.target === railRef.current) {
        event.preventDefault();
        enableUserSelection(false);
        setIsGrabbing(true);
        handleSliderInteraction(event.clientX);
      }
    }

    function handleMouseMove(event: MouseEvent) {
      if (isGrabbing) {
        handleSliderInteraction(event.clientX);
      }
    }

    function handleMouseUp() {
      enableUserSelection(true);
      if (isGrabbing) {
        setIsGrabbing(false);
      }
    }

    function enableUserSelection(value: boolean) {
      document.body.style.userSelect = value ? "auto" : "none";
    }

    window.addEventListener("mousedown", handleMouseDown, {
      signal: abortController.signal,
    });
    window.addEventListener("mousemove", handleMouseMove, {
      signal: abortController.signal,
    });
    window.addEventListener("mouseup", handleMouseUp, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
  }, [railRef, handleRef, handleSliderInteraction, maxStep]);
}

// STYLES =====================================================================================

const wrapperStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  width: 100%;
  height: 10px;
  cursor: pointer;
  border-radius: 1000px;

  :hover {
    box-shadow: 0px 0px 20px 2px #15e08863;
  }
`;

const railStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 1px solid #15e087;
  border-radius: 1000px;
  cursor: pointer;
`;

const trackStyle = css`
  position: absolute;
  height: 100%;
  background-color: #15e087;
  border: 1px solid #15e087;
  border-radius: 1000px;
  pointer-events: none;
`;

const handlerStyle = (pos: number) => css`
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: #ffffff;
  border: 2px solid #00041a;
  cursor: grab;
  left: ${pos}px;
  transform: translateX(-50%);
  pointer-events: none;

  :hover,
  :active {
    transform: scale(1.1) translateX(-50%);
  }
`;
