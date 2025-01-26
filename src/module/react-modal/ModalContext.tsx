import { createContext } from 'react';
import { ModalManager } from '@/module/react-modal/ModalManager.ts';

type ModalContextType = ModalManager | null;

export const ModalContext = createContext<ModalContextType>(null);
