import {useEffect, RefObject} from 'react';

export interface ModalHooksProps {
  modalRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
  closeOnOutsideClick?: boolean;
  onClose?: () => void;
}

export function useModalCloseOnOutsideClick({
  modalRef,
  isOpen,
  onClose,
  closeOnOutsideClick,
}: ModalHooksProps) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && closeOnOutsideClick && event.target instanceof Node) {
        if (onClose && !modalRef.current?.contains(event.target)) {
          onClose();
        }
      }
    };

    if (isOpen && closeOnOutsideClick) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      if (isOpen && closeOnOutsideClick) {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    };
  }, [isOpen, onClose, modalRef, closeOnOutsideClick]);
}
