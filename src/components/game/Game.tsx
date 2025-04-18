import { css } from "@emotion/react";
import Map from "./Map";
import StepControls from "../ui/StepControls";
import { stagesList } from "../../data/stages";
import Header from "../ui/Header";
import { useEffect, useState } from "react";
import Legend from "../ui/Legend";
import { Theme } from "../../common/theme";
import Joystick from "../ui/Joystick";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import PacmanTexture from "../../assets/svgs/pacman.svg?react";
import GhostTexture from "../../assets/svgs/ghost.svg?react";
import Footer from "../ui/Footer";

type Orientation = "portrait" | "landscape";

const stage = stagesList[0];

// COMPONENT =====================================================================================

export default function Game() {
  const [orientation, setOrientation] = useState<Orientation>(
    getScreenOrientation()
  );

  useOrientation(orientation, setOrientation);

  return (
    <>
      <div css={backgroundStyle} />

      <div id="game-view" css={wrapperStyle}>
        <Header css={headerStyle} title="Breadth First Search (BFS)" />
        <main css={mainContainerStyle(orientation)}>
          {orientation === "landscape" && leftJoystick}
          <div css={centerContainerStyle}>
            <Map css={mapStyle(orientation)} stage={stage} />
            <Legend css={legendStyle} />
            <StepControls css={stepControlStyle} />
          </div>
          {orientation === "landscape" && rightJoystick}
          {orientation === "portrait" && (
            <div css={joystickContainerStyle(orientation)}>
              {leftJoystick}
              {rightJoystick}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

// RENDERS =====================================================================================

const leftJoystick = (
  <Joystick
    style={{ alignSelf: "center", maxWidth: "150px" }}
    centerIcon={<PacmanTexture />}
    labels={["W", "A", "S", "D"]}
  />
);

const rightJoystick = (
  <Joystick
    style={{ alignSelf: "center", maxWidth: "150px" }}
    centerIcon={<GhostTexture />}
    labels={[<FaArrowUp />, <FaArrowLeft />, <FaArrowRight />, <FaArrowDown />]}
  />
);

function getScreenOrientation(): Orientation {
  return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
}

// HOOKS =====================================================================================

function useOrientation(
  orientation: Orientation,
  setOrientation: (orientation: Orientation) => void
) {
  useEffect(() => {
    function handleWidth() {
      const currentOrientation =
        window.innerWidth > window.innerHeight ? "landscape" : "portrait";
      if (currentOrientation !== orientation) {
        setOrientation(currentOrientation);
      }
    }

    window.addEventListener("resize", handleWidth);

    return () => window.removeEventListener("resize", handleWidth);
  }, [orientation, setOrientation]);
}

// STYLES =====================================================================================

const maxWidth = "1100px";

const backgroundStyle = css`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -100;
  background: linear-gradient(to top, #060705 60%, #1e2811);
`;

const headerStyle = css`
  width: 100%;
  height: 37px;
  font-size: clamp(1.2rem, 3vw, 1.4rem);
  background-color: transparent;
  color: ${Theme.colors.white_2};
  font-weight: 500;
  margin-top: 15px;
`;

const wrapperStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100svh;
  max-height: 100vh;
`;

const mainContainerStyle = (orientation: Orientation) => css`
  display: flex;
  flex-direction: ${orientation === "portrait" ? "column" : "row"};
  gap: ${orientation === "landscape" ? "40px" : "0px"};
  justify-content: start;
  align-items: start;
  width: 100%;
  max-width: ${maxWidth};
  height: 100%;
  padding: 10px 20px;
  flex: 1;
`;

const centerContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const joystickContainerStyle = (orientation: Orientation) => css`
  display: flex;
  justify-items: center;
  justify-content: space-around;
  gap: 20px;
  width: 40vw;
  height: 100%;
  width: ${orientation === "portrait" ? "100%" : "max-content"};
  margin-top: 30px;

  .joystick {
    max-width: 150px;
    max-height: 150px;
  }
`;

const mapStyle = (orientation: Orientation) => css`
  display: flex;
  justify-content: center;
  align-items: start;
  max-width: ${orientation === "portrait" ? "50svh" : "60svh"};
`;

const legendStyle = css`
  width: max-content;
  margin-top: 10px;

  span {
    font-size: clamp(0.5rem, 3vw, 1rem);
    font-weight: ${Theme.fontWeight.light};
  }

  * svg {
    width: clamp(15px, 5vw, 30px);
    aspect-ratio: 1;
  }
`;

const stepControlStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 80%;
  margin-top: 30px;

  @media screen and (max-height: 430px) {
    button {
      padding: 5px 15px;
    }
  }
`;
