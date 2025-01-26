import { ReactNode, useEffect, useState } from 'react';
import { ModalContext } from './ModalContext.tsx';
import { ModalContainer } from './ModalContainer.tsx';
import { ModalManager } from '@/module/react-modal/ModalManager.ts';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const flagState = useState(1);
  const [modalManager] = useState(() => new ModalManager(flagState));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ModalContext.Provider value={modalManager}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
};
