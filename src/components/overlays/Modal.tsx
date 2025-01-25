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
    <div className={`fixed inset-0 flex justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div ref={modalRef} className={`bg-white rounded-[20px] shadow-lg ${className}`}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
