import { useEffect } from "react";
import { useGameStore } from "../../stores/mainStore";

export default function InputManager() {
  useEffect(() => {
    let lastKey = "";

    function handleKeyDown(e: KeyboardEvent) {
      if (lastKey !== e.key) {
        lastKey = e.key;
        e.preventDefault();
        useGameStore.getState().setPressedKey({ value: e.key });
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (lastKey === e.key) {
        lastKey = "";
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <></>;
}
