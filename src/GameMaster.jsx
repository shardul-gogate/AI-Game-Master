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
import { useLargeModal } from "./hooks/useLargeModal";
import SmallModal from "./components/SmallModal";
import PlotPointsModal from "./components/PlotPointsModal";
import { LargeModalTypeEnum } from "./utils/enums";

export default function GameMaster() {
  const [prompt, setPrompt] = useState("");

  const { gameState } = useGameState();
  
  const {
    plotPoints,
    addPlotPoint,
    updatePlotPoint,
    deletePlotPoint
  } = usePlotPoints();
  
  const { quests } = useQuests();

  const { saveFullGame, loadGame } = useFullSave();
  
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

  const {
    isSmallModalOpen,
    smallModalTypeEnum,
    handleSave: handleSaveSmallModal,
    handleCancel: handleCancelSmallModal,
    openModal: openSmallModal
  } = useSmallModal(saveFullGame, loadGame);

  const {
    isLargeModalOpen,
    largeModalTypeEnum,
    handleSave: handleSaveLargeModal,
    handleCancel: handleCancelLargeModal,
    openModal: openLargeModal,
    closeModal: closeLargeModal
  } = useLargeModal();

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
          openModal={openSmallModal}
          openLargeModal={openLargeModal}
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
          placeholder="Describe your action or dialogue . . ."
          onSend={handleSendPrompt}
          loading={loading}
          eraseLastMessage={eraseLastMessage}
          retry={retry}
          continueChat={continueChat}
        />
      </div>
      {isSmallModalOpen && <SmallModal smallModalTypeEnum={smallModalTypeEnum} onConfirm={handleSaveSmallModal} onCancel={handleCancelSmallModal} />}
      {isLargeModalOpen && largeModalTypeEnum === LargeModalTypeEnum.PLOT_POINTS && <PlotPointsModal
        closeModal={closeLargeModal}
        plotPoints={plotPoints}
        addPlotPoint={addPlotPoint}
        updatePlotPoint={updatePlotPoint}
        deletePlotPoint={deletePlotPoint}
      />}
    </>
  );
}