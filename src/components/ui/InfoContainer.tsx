import { css } from "@emotion/react";
import { ReactNode } from "react";
import { Theme } from "../../common/theme";

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function InfoContainer({ children, title }: Props) {
  return (
    <div css={wrapperStyle}>
      <span css={titleStyle}>{title}</span>
      {children}
    </div>
  );
}

const wrapperStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 15px 10px 10px 10px;
  border: 2px solid #96979d;
  border-radius: 6px;
  color: #fff;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    text-align: center;
    padding-top: 5px;
    list-style: none;
    ${Theme.fontWeight.thin};
    text-align: right;
  }
`;

const titleStyle = css`
  position: absolute;
  top: 0px;
  padding: 0 15px;
  font-weight: ${Theme.fontWeight.semiBold};
  background-color: #00041a;
  transform: translateY(-50%);
`;
