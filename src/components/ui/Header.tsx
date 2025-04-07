import { css } from "@emotion/react";
import { Theme } from "../../common/theme";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return <header css={headerStyle(Theme.map.maxMapWidth)}>{title}</header>;
}

const headerStyle = (maxWidth: number) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  /* max-width: ${maxWidth}px; */
  padding: 10px;
  font-size: 1.7rem;
  background-color: #0c134f;
  color: white;
  border-radius: 10px;

  @media screen and (max-width: 380px) {
    font-size: 1.3rem;
  }
`;
