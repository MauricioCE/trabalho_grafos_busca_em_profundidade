export const Theme = {
  tileColor: {
    current: "#15e087",
    queued: "#290f8e",
    unVisited: "#0c134f",
    visited: "#0c134f",
    wall: "#20533c",
  },
  map: {
    tileSize: 64,
    tileGap: 1,
    maxMapWidth: 700,
  },
  textSize: {
    extraBig: "3rem",
    big: "2rem",
    medium: "1.5rem",
    small: "1rem",
    extraSmall: "0.8rem",
  },
  fontWeight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  directions: {
    up: { x: -1, y: 0 },
    left: { x: 0, y: -1 },
    down: { x: 1, y: 0 },
    right: { x: 0, y: 1 },
  },

  getDirections: () => {
    return Object.values(Theme.directions);
  },
} as const;
