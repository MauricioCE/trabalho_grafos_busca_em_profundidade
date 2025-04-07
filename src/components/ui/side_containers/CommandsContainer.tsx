import InfoContainer from "../InfoContainer";
import WasdIcon from "../../../assets/svgs/wasd.svg?react";
import ArrowsIcon from "../../../assets/svgs/arrows.svg?react";

export default function CommandsContainer() {
  return (
    <InfoContainer title="Comandos">
      <ul>
        <li>
          <span>Pacman: </span>
          <WasdIcon style={{ width: "80px" }} />
        </li>
        <li>
          <span>Ghost: </span>
          <ArrowsIcon style={{ width: "80px" }} />
        </li>
        <li>
          <span>Tiles: </span>
          <span style={{ fontSize: "0.9rem" }}>clique para mudar</span>
        </li>
      </ul>
    </InfoContainer>
  );
}
