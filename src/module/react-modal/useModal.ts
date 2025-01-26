import { useContext } from 'react';
import { ModalContext } from './ModalContext.tsx';

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalProvider is not found');
  }
  return context;
};
