import Container from '@components/Container.tsx';
import PopupList from '@/pages/popup/(components)/list.tsx';
import { useState } from 'react';
import PopupPreviewModal from '@/pages/popup/(components)/previewModal.tsx';
import { Link } from 'react-router';

const PopupPage = () => {
  const [popupId, setPopupId] = useState<number | null>();

  const selectPopupId = (id: number) => {
    setPopupId(() => id);
  };

  const removePopupId = () => {
    setPopupId(() => null);
  };

  return (
    <Container
      title="팝업"
      suffix={
        <Link
          to="/popup/form"
          className="pt-2 pb-2.5 px-7 text-sm border-0 bg-blue-600 text-white rounded-lg"
        >
          팝업등록
        </Link>
      }
    >
      <PopupList selectPopupId={selectPopupId} />
      <PopupPreviewModal popupId={popupId} removePopupId={removePopupId} />
    </Container>
  );
};

export default PopupPage;
