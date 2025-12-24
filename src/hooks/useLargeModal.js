import { useState } from 'react';

export const useLargeModal = () => {
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [largeModalTypeEnum, setLargeModalTypeEnum] = useState(null);

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
    openModal,
    closeModal
  };
};