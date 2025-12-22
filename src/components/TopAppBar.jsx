import { useState } from "react";
import { IconButton } from "./IconButton";
import SaveGameModal from "./SaveGameModal";

export default function TopAppBar({ saveHistory, saveFullGame }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (saveName) => {
    saveFullGame(saveName);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='top-app-bar'>
        <div className="top-app-bar-title">AI Game Master</div>
        <div className='top-app-bar-button-row'>
          <IconButton icon="quicksave" onClick={saveHistory} />
          <IconButton icon="fullsave" onClick={() => setIsModalOpen(true)} />
          <IconButton icon="load" onClick={() => console.log("Edit clicked")} />
          <IconButton icon="plotpoints" onClick={() => console.log("Delete clicked")} />
          <IconButton icon="quests" onClick={() => console.log("Save clicked")} />
          <IconButton icon="settings" onClick={() => console.log("Save clicked")} />
        </div>
      </div>
      {isModalOpen && <SaveGameModal onSave={handleSave} onCancel={handleCancel} />}
    </>
  );
}
