import { css } from "@emotion/react";
import { Theme } from "../../common/theme";

type Props = {
  className?: string;
  title: string;
};

export default function Header({ className, title }: Props) {
  return (
    <header css={headerStyle} className={className}>
      {title}
    </header>
  );
}

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${Theme.colors.primary};
  color: ${Theme.colors.black_2};
`;
