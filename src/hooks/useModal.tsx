// useModal.tsx
import { useState } from 'react';
import Modal, { ModalType } from '@/components/CustomModal';

export const useModal = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'alert' as ModalType,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const openModal = (config: Omit<typeof modalState, 'isOpen'>) => {
    setModalState({
      ...config,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  // alert 함수
  const alert = (message: string, title?: string) => {
    return new Promise<void>((resolve) => {
      openModal({
        type: 'alert',
        title: title || '',
        message,
        onConfirm: resolve,
        onCancel: () => {},
      });
    });
  };

  // confirm 함수
  const confirm = (message: string, title?: string) => {
    return new Promise<boolean>((resolve) => {
      openModal({
        type: 'confirm',
        title: title || '',
        message,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  };

  const modalComponent = (
    <Modal
      isOpen={modalState.isOpen}
      type={modalState.type}
      title={modalState.title}
      message={modalState.message}
      onConfirm={modalState.onConfirm}
      onCancel={modalState.onCancel}
      onClose={closeModal}
    />
  );

  return {
    alert,
    confirm,
    modalComponent,
  };
};

export default useModal;
