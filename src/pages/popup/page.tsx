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
      prefix={
        <Link
          to="/popup/form"
          className="bg-zinc-800 text-white pt-2 pb-2.5 px-6 text-sm rounded-full"
        >
          팝업 등록
        </Link>
      }
    >
      <PopupList selectPopupId={selectPopupId} />
      <PopupPreviewModal popupId={popupId} removePopupId={removePopupId} />
    </Container>
  );
};

export default PopupPage;
