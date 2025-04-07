import { css } from "@emotion/react";
import Map from "./Map";
import Controls from "../ui/Controls";
import { stagesList } from "../../data/stages";
import Header from "../ui/Header";
import InfoContainer from "../ui/InfoContainer";
import LegendContainer from "../ui/side_containers/LegendContainer";
import CommandsContainer from "../ui/side_containers/CommandsContainer";

// const animSpeed = 100;
const stage = stagesList[0];

export default function Game() {
  return (
    <div id="game-view" css={wrapperStyle}>
      <Header title="Breadth First Search (BFS)" />
      <main css={mainContainerStyle}>
        <aside css={sideContainerStyle}>
          <LegendContainer />
          <CommandsContainer />
        </aside>
        <section css={centerContainerStyle}>
          <Map css={mapContainerStyle} stage={stage} />
          <Controls css={controlsContainerStyle} />
        </section>
        <aside css={sideContainerStyle}>
          <InfoContainer></InfoContainer>
        </aside>
      </main>
    </div>
  );
}

// STYLES =====================================================================================

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100svh;
  background-color: #00041a;
  padding: 10px 20px 20px 20px;
`;

const sideContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: start;
  align-items: center;
  width: 200px;
`;

const mainContainerStyle = css`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;

const centerContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  max-height: 2000px;

  @media screen and (max-height: 1000px) {
    height: calc(100svh - 250px);
    max-width: max-content;
  }
`;

const mapContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
`;

const controlsContainerStyle = css`
  width: 100%;
  height: max-content;
`;
