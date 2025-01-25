import Modal from '@components/overlays/Modal.tsx';
import { FiX } from 'react-icons/fi';

interface PopupPreviewModalProps {
  popupId: number | null | undefined;
  removePopupId: () => void;
}

const PopupPreviewModal = ({ popupId, removePopupId }: PopupPreviewModalProps) => {
  return (
    <Modal isOpen={!!popupId}>
      <div className="relative">
        <button type="button" className="absolute right-3 top-3" onClick={() => removePopupId()}>
          <FiX className="text-3xl" />
        </button>

        <img
          src="https://d3h8nxdypzlrx8.cloudfront.net/assets/images/popup/01.jpg"
          alt="팝업"
          className="w-[500px] h-[500px] rounded-xl"
        />
      </div>
    </Modal>
  );
};

export default PopupPreviewModal;
