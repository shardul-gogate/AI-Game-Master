import { useState } from "react";
import UserInput from "./components/UserInput";
import ActionButton from "./components/ActionButton";
import Canvas from "./components/Canvas";
import GameState from "./components/GameState";
import ModelSelector from "./components/ModelSelector";
import { useChat } from "./hooks/useChat";
import { useGameState } from "./hooks/useGameState";
import { useQuests } from "./hooks/useQuests";
import { usePlotPoints } from "./hooks/usePlotPoints";
import TopAppBar from "./components/TopAppBar";

export default function GameMaster() {
  const [prompt, setPrompt] = useState("");

  const { gameState, updateGameState } = useGameState();
  const { plotPoints } = usePlotPoints();
  const { quests } = useQuests();
  const {
    messages,
    setMessages,
    loading,
    model,
    setModel,
    saveHistory,
    eraseLastMessage,
    retry,
    continueChat,
    send
  } = useChat(quests, plotPoints, gameState);

  const handleSendPrompt = () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;
    send(trimmedPrompt);
    setPrompt("");
  };

  return (
    <div className="game-master">
        <TopAppBar/>
        <Canvas
          messages={messages}
          onEditMessage={(idx, newValue) => {
            setMessages((prev) =>
              prev.map((m, i) => (i === idx ? newValue : m))
            );
          }}
        />

        {/* Input + Button + Gamestate row */}
        <div style={{ display: "flex", gap: 8, flex: 2 }}>
          <UserInput
            value={prompt}
            onChange={setPrompt}
            placeholder="Describe your action or dialogue"
          />
          {/* Column for Buttons and GameState */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <ActionButton
                label={loading ? "..." : "Send"}
                onClick={handleSendPrompt}
                disabled={loading}
              />
              <ActionButton
                label={loading ? "..." : "Erase"}
                onClick={eraseLastMessage}
                disabled={loading}
              />
              <ActionButton
                label={loading ? "..." : "Retry"}
                onClick={retry}
                disabled={loading}
              />
              <ActionButton
                label={loading ? "..." : "Continue"}
                onClick={continueChat}
                disabled={loading}
              />
              <ActionButton
                label="Save"
                onClick={saveHistory}
              />
            </div>
            <GameState
              gameState={gameState}
              onChange={updateGameState}
            />
            <ModelSelector
              model={model}
              onChange={(newModel) => setModel(newModel)}
            />
          </div>
        </div>
      </div>
  );
}