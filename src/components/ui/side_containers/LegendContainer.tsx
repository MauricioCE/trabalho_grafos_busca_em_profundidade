import LegendItem from "../LegendItem";
import { Theme } from "../../../common/theme";
import InfoContainer from "../InfoContainer";

export default function LegendContainer() {
  return (
    <InfoContainer title="Legendas">
      <ul>
        <LegendItem color={Theme.tileColor.unVisited} legend="não visitado" />
        <LegendItem
          color={Theme.tileColor.visited}
          legend="visitado"
          tileText="0"
        />
        <LegendItem color={Theme.tileColor.queued} legend="enfileirado" />
        <LegendItem
          color={Theme.tileColor.current}
          legend="atual"
          tileText="0"
        />
        <LegendItem color={Theme.tileColor.wall} legend="muro" />
        <LegendItem color="none" renderStroke legend="vizinho" />
      </ul>
    </InfoContainer>
  );
}
