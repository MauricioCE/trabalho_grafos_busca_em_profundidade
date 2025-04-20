import { create } from "zustand";
import { Size, Vector2 } from "../common/types";
import { GameMap } from "../components/game/Map";
import { clamp } from "../utils/generalUtils";

export interface GameState {
  map: GameMap;
  mapSize: Size;
  pacmanCoord: Vector2;
  ghostCoord: Vector2;
  steps: number;
  maxSteps: number;
  path: Vector2[];
  pressedKey: { value: string };

  updateMap: number; // TODO: Verificar a necessidade desta variável

  setMap: (newMap: GameMap) => void;
  setMapSize: (newSize: Size) => void;
  setPacmanCoord: (coord: Vector2) => void;
  setGhostCoord: (coord: Vector2) => void;
  setSteps: (value: number) => void;
  setStepsBy: (value: number) => void;
  setMaxSteps: (value: number) => void;
  triggerUpdate: (value: number) => void; // TODO: Verificar a necessidade desta função
  setPath: (path: Vector2[]) => void;
  setPressedKey: (key: { value: string }) => void;
}

export const useGameStore = create<GameState>((set) => ({
  map: [],
  mapSize: { width: 0, height: 0 },
  pacmanCoord: { x: -1, y: -1 },
  ghostCoord: { x: -1, y: -1 },
  steps: 0,
  maxSteps: 0,
  updateMap: 1,
  path: [],
  pressedKey: { value: "" },

  setMap: (newMap: GameMap) => set({ map: newMap }),

  setMapSize: (newSize: Size) => set({ mapSize: newSize }),

  setPacmanCoord: (coord: Vector2) => set({ pacmanCoord: coord }),

  setGhostCoord: (coord: Vector2) => set({ ghostCoord: coord }),

  setSteps: (value: number) =>
    set((state) => ({ steps: clamp(value, 0, state.maxSteps) })),

  setStepsBy: (value: number) =>
    set((state) => ({ steps: clamp(state.steps + value, 0, state.maxSteps) })),

  setMaxSteps: (value: number) => set({ maxSteps: value }),

  triggerUpdate: () => set((state) => ({ updateMap: state.updateMap + 1 })),

  setPath: (path: Vector2[]) => set({ path: path }),

  setPressedKey: (key: { value: string }) => set({ pressedKey: key }),
}));
