import React, { useState } from 'react';
import { SmallModalTypEnum } from '../utils/enums';

export default function SmallModal({ smallModalTypeEnum, onConfirm, onCancel }) {
  const [saveLoadName, setSaveLoadName] = useState('');
  const modalTitle = smallModalTypeEnum === SmallModalTypEnum.SAVE ? 'Save Game' : 'Load Game';
  const buttonTitle = smallModalTypeEnum === SmallModalTypEnum.SAVE ? 'Save' : 'Load';

  const handleSave = () => {
    onConfirm(saveLoadName);
  };

  return (
    <div className="modal-overlay">
      <div className="small-modal">
        <h2>{modalTitle}</h2>
        <input
          type="text"
          value={saveLoadName}
          onChange={(e) => setSaveLoadName(e.target.value)}
          placeholder="Enter the game name"
        />
        <div className="small-modal-buttons">
          <button onClick={handleSave}>{buttonTitle}</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
