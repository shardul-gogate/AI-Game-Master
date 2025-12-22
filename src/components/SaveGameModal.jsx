import React, { useState } from 'react';

export default function SaveGameModal({ onSave, onCancel }) {
  const [saveName, setSaveName] = useState('');

  const handleSave = () => {
    onSave(saveName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Save Game</h2>
        <input
          type="text"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          placeholder="Enter save game name"
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
