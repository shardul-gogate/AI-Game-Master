import { IconButton } from './IconButton';
import { IconButtonEnum } from '../utils/enums';
import { useState } from 'react';

export default function SettingsModal({ settings, saveSettings, ollamaModels, closeModal}) {
  const [ollamaModel, setOllamaModel] = useState(settings.ollamaModel);
  const [systemInstructions, setSystemInstructions] = useState(settings.systemInstructions);

  const handleSave = () => {
    saveSettings({ ollamaModel, systemInstructions });
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="large-modal">
        <div className="close-large-modal">
          <span>Settings</span>
          <IconButton icon={IconButtonEnum.CLOSE} onClick={closeModal} />
        </div>
        <div className='settings-ollama-models'>
          <span>Select Model: </span>
          <select value={ollamaModel} onChange={(e) => setOllamaModel(e.target.value)}>
            {
              ollamaModels.map(model => (
                <option key={model.model} value={model.model}>{model.model}</option>
              ))
            }
          </select>
        </div>
        <textarea
          className='settings-system-instructions'
          rows={10}
          value={systemInstructions}
          onChange={(e) => setSystemInstructions(e.target.value)}
          placeholder='System Instructions'
        />
        <button className='settings-save-button' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
