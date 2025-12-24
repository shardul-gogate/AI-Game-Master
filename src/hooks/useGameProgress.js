import { useState, useEffect } from "react";
import { buildAIPrompt } from "../utils/buildPrompt";
import { ApiPaths } from "../utils/constants";
import api from "../utils/api";

export function useGameProgress(quests, plotPoints, gameState) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get(ApiPaths.Api_Progress)
      .then((data) => setMessages(data));
  }, []);

  const saveHistory = () => {
    api.post(ApiPaths.Api_Progress, messages);
  };

  const eraseLastMessage = () => setMessages(m => m.slice(0, -1));

  const send = (prompt) => setMessages(m => [...m, prompt]);

  return { messages, setMessages, saveHistory, eraseLastMessage, send };
}