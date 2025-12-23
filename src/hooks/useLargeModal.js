import { useState } from 'react';

export const useLargeModal = () => {
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [largeModalTypeEnum, setLargeModalTypeEnum] = useState(null);

  const handleSave = () => {
    setIsLargeModalOpen(false);
  };

  const handleCancel = () => {
    setIsLargeModalOpen(false);
  };

  const openModal = (modalType) => {
    setLargeModalTypeEnum(modalType);
    setIsLargeModalOpen(true);
  };

  const closeModal = () => {
    setIsLargeModalOpen(false);
  };


  return {
    isLargeModalOpen,
    largeModalTypeEnum,
    handleSave,
    handleCancel,
    openModal,
    closeModal
  };
};