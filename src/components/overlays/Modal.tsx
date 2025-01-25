import { useModalCloseOnOutsideClick } from '@/hooks/useModalInterface';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

export interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  className = '',
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useModalCloseOnOutsideClick({ modalRef, isOpen, onClose, closeOnOutsideClick });

  return ReactDOM.createPortal(
    <div
      className={`fixed left-0 top-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-20 ${className} ${isOpen ? 'block' : 'hidden'}`}
    >
      {children}
    </div>,
    document.body
  );
};

export default Modal;
