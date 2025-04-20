import { css } from "@emotion/react";

export default function Footer() {
  return (
    <footer css={wrapperStyle}>
      <span css={textContainer}>Desenvolvido por Maurício Jr.</span>
      <a css={linkStyle} href="https://github.com/MauricioCE" target="_blank">
        GitHub
      </a>
    </footer>
  );
}

const wrapperStyle = css`
  bottom: 0px;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  color: #fbfbfb;
  font-size: 0.9rem;
  font-weight: 200;
  backdrop-filter: blur(4px);
`;

const textContainer = css`
  width: 100%;
  height: 100%;
  margin-right: 5px;
`;

const linkStyle = css`
  width: 100%;
  height: 100%;
  color: #fbfbfb;
  font-weight: 600;
`;
