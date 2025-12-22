import { useState } from "react";
import UserInput from "./components/UserInput";
import Canvas from "./components/Canvas";
import { useGameProgress } from "./hooks/useGameProgress";
import { useGameState } from "./hooks/useGameState";
import { useQuests } from "./hooks/useQuests";
import { usePlotPoints } from "./hooks/usePlotPoints";
import { useFullSave } from "./hooks/useFullSave";
import TopAppBar from "./components/TopAppBar";
import { useSmallModal } from "./hooks/useSmallModal";
import SmallModal from "./components/SmallModal";

export default function GameMaster() {
  const [prompt, setPrompt] = useState("");

  const { gameState } = useGameState();
  
  const { plotPoints } = usePlotPoints();
  
  const { quests } = useQuests();
  
  const {
    messages,
    setMessages,
    loading,
    eraseLastMessage,
    retry,
    continueChat,
    send,
    saveHistory
  } = useGameProgress(quests, plotPoints, gameState);

  const { saveFullGame, loadGame } = useFullSave();

  const {
    isSmallModalOpen,
    smallModalTypeEnum,
    handleSave,
    handleCancel,
    openModal
  } = useSmallModal(saveFullGame, loadGame);

  const handleSendPrompt = () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;
    send(trimmedPrompt);
    setPrompt("");
  };

  return (
    <>
      <div className="game-master">
        <TopAppBar
          saveHistory={saveHistory}
          openModal={openModal}
        />
        <Canvas
          messages={messages}
          onEditMessage={(index, newValue) => {
            setMessages((prev) =>
              prev.map((m, i) => (i === index ? newValue : m))
            );
          }}
        />
        <UserInput
          value={prompt}
          onChange={setPrompt}
          placeholder="Describe your action or dialogue"
          onSend={handleSendPrompt}
          loading={loading}
          eraseLastMessage={eraseLastMessage}
          retry={retry}
          continueChat={continueChat}
        />
      </div>
      {isSmallModalOpen && <SmallModal smallModalTypeEnum={smallModalTypeEnum} onConfirm={handleSave} onCancel={handleCancel} />}
    </>
  );
}