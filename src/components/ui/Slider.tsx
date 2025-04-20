import { css } from "@emotion/react";
import { RefObject, useEffect, useRef, useState } from "react";
import { Theme } from "../../common/theme";
import { clamp } from "../../utils/generalUtils";

type Props = {
  height?: number;
  min: number;
  max: number;
  step?: number;
  value?: number;
  onValueChange?: (value: number) => void;
};

/**
 *
 * @param {number} step - Defines the range between the slider possible values. Ex: A slider with min=0, max=10 and step=1 will have 11 steps values, from 0 to 10
 * @param {number} min - Defines the minimum value the slider can have
 * @param {number} max - Defines the maximum value the slider can have
 * @param {number} value - Defines the current value of the slider
 * @param {(value: number) => void} onValueChange - Callback function called when the slider value changes
 * @returns
 */
export default function Slider({
  height = 10,
  step = 1,
  min: minValue,
  max: maxValue,
  value = 0,
  onValueChange,
}: Props) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number>(null);
  const valueInterval = maxValue - minValue;
  const maxStep = Math.max(1, Math.ceil(valueInterval / step));
  const handleDistPercent = (currentValue / maxValue) * 100;

  function handleInputInteraction(posX: number) {
    if (railRef.current) {
      const railRect = railRef.current.getBoundingClientRect();
      const railStep = (railRect.width * step) / valueInterval;
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
          minValue + (handleSnapX * valueInterval) / railRect.width,
          minValue,
          maxValue
        )
      );

      setCurrentValue(nextValue);

      if (onValueChange) {
        onValueChange(nextValue);
      }
    }
  }

  useValueMonitor(value, setCurrentValue);
  useInputInteraction(
    isGrabbing,
    railRef,
    handleRef,
    pointerIdRef,
    setIsGrabbing,
    handleInputInteraction,
    maxStep
  );

  return (
    <div css={wrapperStyle(height)}>
      <div ref={railRef} css={railStyle}></div>
      <div css={trackStyle} style={{ width: `${handleDistPercent}%` }}></div>
      <div
        ref={handleRef}
        css={handlerStyle}
        style={{ left: `${handleDistPercent}%` }}
      />
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}

function useInputInteraction(
  isGrabbing: boolean,
  railRef: RefObject<HTMLDivElement | null>,
  handleRef: RefObject<HTMLDivElement | null>,
  pointerIdRef: RefObject<number | null>,
  setIsGrabbing: (value: boolean) => void,
  handleInputInteraction: (value: number) => void,
  maxStep: number
) {
  useEffect(() => {
    const abortController = new AbortController();

    function handleInteractionStart(event: PointerEvent) {
      if (isGrabbing) return;

      const target = event.target;
      if (target === railRef.current || target === handleRef.current) {
        pointerIdRef.current = event.pointerId;
        event.preventDefault();
        enableUserSelection(false);
        setIsGrabbing(true);
        handleInputInteraction(event.clientX);
      }
    }

    function handleInteractionMove(event: PointerEvent) {
      event.preventDefault();
      if (!isGrabbing || event.pointerId !== pointerIdRef.current) return;

      handleInputInteraction(event.clientX);
    }

    function handleInteractionEnd(event: PointerEvent) {
      if (!isGrabbing || event.pointerId !== pointerIdRef.current) return;

      pointerIdRef.current = null;
      enableUserSelection(true);
      setIsGrabbing(false);
    }

    function enableUserSelection(value: boolean) {
      document.body.style.userSelect = value ? "auto" : "none";
    }

    window.addEventListener("pointerdown", handleInteractionStart, {
      signal: abortController.signal,
    });

    window.addEventListener("pointermove", handleInteractionMove, {
      passive: false,
      signal: abortController.signal,
    });

    window.addEventListener("pointercancel", handleInteractionEnd, {
      signal: abortController.signal,
    });

    window.addEventListener("pointerup", handleInteractionEnd, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
  }, [
    handleInputInteraction,
    handleRef,
    isGrabbing,
    maxStep,
    pointerIdRef,
    railRef,
    setIsGrabbing,
  ]);
}

// STYLES =====================================================================================

const wrapperStyle = (height: number) => css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${height}px;
  border-radius: 1000px;
  cursor: pointer;
  touch-action: none;
`;

const railStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid ${Theme.colors.brightGreen};
  border-radius: 1000px;
  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 20px 2px ${Theme.colors.brightGreenTransp};
  }
`;

const trackStyle = css`
  position: absolute;
  height: 100%;
  background-color: ${Theme.colors.brightGreen};
  border-radius: 1000px;
  pointer-events: none;
`;

const handlerStyle = css`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${Theme.colors.white_1};
  border: 2px solid ${Theme.colors.black_1};
  transform: translateX(-50%);

  :hover,
  :active {
    transform: scale(1.1) translateX(-50%);
  }
`;
