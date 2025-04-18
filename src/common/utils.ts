import { Theme } from "./theme";
import { Direction, Vector2 } from "./types";

// Diz se o dispositivo do usuário é ou não mobile
export function isMobile() {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

// Limita um valor entre um valor mínimo e um máximo
export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}
// Diz se dois Vector2 são iguais
export function isSamePosition(posA: Vector2, posB: Vector2) {
  return posA.x === posB.x && posA.y === posB.y;
}
// Converte uma posição no mapa para coordenadas que podem ser usadas na matriz
// que TileData[][] que representa o mapa do jogo
export function positionToCoordinate(pos: Vector2) {
  return {
    x: Math.floor(pos.x / (Theme.map.tileSize + Theme.map.tileGap)),
    y: Math.floor(pos.y / (Theme.map.tileSize + Theme.map.tileGap)),
  };
}
// Converte uma coordenada usada na matriz de dados do mapa para uma posição
// de renderização no Map
export function coordinateToPosition(coord: Vector2) {
  return {
    x: Theme.map.tileSize * coord.x + coord.x * Theme.map.tileGap,
    y: Theme.map.tileSize * coord.y + coord.y * Theme.map.tileGap,
  };
}
// Retorna uma string que representa a direção que o target está da coordenada informada
export function directionBetween(
  coord: Vector2,
  targetCoord: Vector2
): Direction {
  if (coord.x - targetCoord.x > 0) return "left";
  if (coord.x - targetCoord.x < 0) return "right";
  if (coord.y - targetCoord.y > 0) return "up";
  return "down";
}
