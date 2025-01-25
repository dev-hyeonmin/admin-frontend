import Container from '@components/Container.tsx';
import PopupList from '@/pages/popup/components/list.tsx';
import { useState } from 'react';
import Modal from '@components/overlays/Modal.tsx';
import { FiX } from 'react-icons/fi';

const PopupPage = () => {
  const [popupId, setPopupId] = useState<number | null>(1);

  const selectPopupId = (id: number) => {
    setPopupId(() => id);
  };

  const removePopupId = () => {
    setPopupId(() => null);
  };

  return (
    <Container title="팝업">
      <PopupList selectPopupId={selectPopupId} />

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
    </Container>
  );
};

export default PopupPage;
