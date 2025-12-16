import { useState, useEffect } from "react";
import { ApiPaths } from "../utils/constants";

export function useGameState() {
  const [gameState, setGameState] = useState({ date: "Unknown", day: "Unknown Day", timeOfDay: "Unknown Time" });

  useEffect(() => {
    fetch(ApiPaths.Api_GameState)
      .then((res) => res.json())
      .then((data) => {
        setGameState({
          date: data.date || "Unknown Date",
          day: data.day || "Unknown Day",
          timeOfDay: data.timeOfDay || "Unknown Time",
        });
      })
      .catch((err) => console.error("Error loading game state:", err));
  }, []);

  const updateGameState = (newState) => {
    setGameState(newState);
    fetch(ApiPaths.Api_GameState, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newState),
    }).catch(err => console.error("Error saving game state:", err));
  };

  return { gameState, updateGameState };
}