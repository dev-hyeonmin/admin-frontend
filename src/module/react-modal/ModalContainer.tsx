import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useModal } from './useModal.ts';

const MODAL_ID = 'modal-container';

export const ModalContainer = () => {
  const modal = useModal();
  const currentModal = modal.currentModal;
  const ModalComponent = currentModal?.modal;
  const props = currentModal?.props;

  useEffect(() => {
    if (document.getElementById(MODAL_ID)) {
      return;
    }
    const modalEl = document.createElement('div');
    modalEl.id = MODAL_ID;
    document.body.append(modalEl);
  }, []);

  if (!currentModal) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalComponent resolve={currentModal.resolve} reject={currentModal.reject} {...props} />,
    window.document.getElementById(MODAL_ID)!
  );
};
