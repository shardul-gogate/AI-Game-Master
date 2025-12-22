import { useState } from 'react';
import { SmallModalTypEnum } from '../utils/enums';

export const useSmallModal = (saveFullGame, loadGame) => {
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [smallModalTypeEnum, setSmallModalTypeEnum] = useState(null);

  const handleSave = (gameName) => {
    if (smallModalTypeEnum === SmallModalTypEnum.SAVE) {
      saveFullGame(gameName);
    } else {
      loadGame(gameName);
    }
    setIsSmallModalOpen(false);
  };

  const handleCancel = () => {
    setIsSmallModalOpen(false);
  };

  const openModal = (modalType) => {
    setSmallModalTypeEnum(modalType);
    setIsSmallModalOpen(true);
  };

  return {
    isSmallModalOpen,
    smallModalTypeEnum,
    handleSave,
    handleCancel,
    openModal,
  };
};
