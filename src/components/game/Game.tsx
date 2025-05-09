import { css } from "@emotion/react";
import Map from "./Map";
import StepControls from "../ui/StepControls";
import { stagesList } from "../../data/stages";
import Header from "../ui/Header";
import { useEffect, useState } from "react";
import Legend from "../ui/Legend";
import { Theme } from "../../common/theme";
import Footer from "../ui/Footer";
import PacmanJoystick from "./joysticks/PacmanJoystick";
import GhostJoystick from "./joysticks/GhostJoystick";
import InputManager from "./InputManager";
import backgroundImage from "../../assets/images/background.png";
import { isMobileDevice } from "../../utils/generalUtils";

type Orientation = "portrait" | "landscape";

const stage = stagesList[0];

// COMPONENT =====================================================================================

export default function Game() {
  const [orientation, setOrientation] = useState<Orientation>(
    getScreenOrientation()
  );
  const isMobile = isMobileDevice();

  useOrientation(orientation, setOrientation);

  return (
    <>
      <InputManager />
      <div css={backgroundStyle} />

      <div id="game-view" css={wrapperStyle}>
        <Header css={headerStyle} title="Breadth First Search (BFS)" />
        <main css={mainContainerStyle(orientation)}>
          {orientation === "landscape" && isMobile && <PacmanJoystick />}
          <div css={centerContainerStyle}>
            <Map css={mapStyle(orientation)} stage={stage} />
            <Legend css={legendStyle} />
            <StepControls css={stepControlStyle} />
          </div>
          {orientation === "landscape" && isMobile && <GhostJoystick />}
          {orientation === "portrait" && (
            <div css={joystickContainerStyle(orientation)}>
              {<PacmanJoystick />}
              {<GhostJoystick />}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

// FUNCTIONS =====================================================================================

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
  background-image: url(${backgroundImage});
  background-size: 200px auto;
  opacity: 0.7;

  /* background: linear-gradient(to top, #00000010, #06070572, #1e2811); */
  /* mask-image: radial-gradient(); */
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
