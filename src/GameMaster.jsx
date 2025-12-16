import { useState } from "react";
import UserInput from "./components/UserInput";
import ActionButton from "./components/ActionButton";
import Canvas from "./components/Canvas";
import PlotPointView from "./components/PlotPointView";
import Quest from "./components/Quest";
import GameState from "./components/GameState";
import ModelSelector from "./components/ModelSelector";
import { useChat } from "./hooks/useChat";
import { useGameState } from "./hooks/useGameState";
import { useQuests } from "./hooks/useQuests";
import { usePlotPoints } from "./hooks/usePlotPoints";

export default function GameMaster() {
  const [prompt, setPrompt] = useState("");

  const { gameState, updateGameState } = useGameState();
  const { plotPoints, addPlotPoint, updatePlotPoint } = usePlotPoints();
  const { quests, addNewQuest, updateQuest } = useQuests();
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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left: Canvas + Input */}
      <div style={{ flex: 5, display: "flex", flexDirection: "column", padding: 12, gap: 8 }}>
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

      {/* Right: Plot Points + Quests */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", borderLeft: "1px solid #ddd", padding: 8, gap: 8 }}>
        
        {/* Plot Points panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", borderBottom: "1px solid #ddd", overflow: "auto" }}>
          <button onClick={addPlotPoint}>+ New Plot Point</button>
          {plotPoints.map((plotPoint, idx) => (
            <PlotPointView
              key={idx}
              description={plotPoint.description}
              triggers={plotPoint.triggers}
              onUpdate={(updatedPlotPoint) => updatePlotPoint(idx, updatedPlotPoint)}
            />
          ))}
        </div>

        {/* Quests panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
          <button onClick={addNewQuest}>+ New Quest</button>
          {quests.map((quest, idx) => (
            <Quest
              key={idx}
              name={quest.name}
              description={quest.description}
              status={quest.status}
              objectives={quest.objectives}
              onUpdate={(updatedQuest) => updateQuest(idx, updatedQuest)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}