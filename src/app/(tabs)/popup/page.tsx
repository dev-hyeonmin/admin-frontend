'use client';

import { useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import PopupList from '@/app/(tabs)/popup/_components/PopupList';
import PageFooter from '@/components/PageFooter';
import { getPopups, updatePopupOrder } from '@/app/(tabs)/popup/actions';

interface Popup {
  id: number;
  title: string;
  image_url: string;
  order: number;
  created_at: Date;
}

export default function Popup() {
  const [originalPopups, setOriginalPopups] = useState<Popup[]>([]); // 서버에서 가져온 원본 데이터
  const [currentPopups, setCurrentPopups] = useState<Popup[]>([]); // 현재 표시되는 데이터 (편집 중일 때는 변경된 순서)
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopups = async () => {
      const data = await getPopups();
      setOriginalPopups(data as unknown as Popup[]);
      setCurrentPopups(data as unknown as Popup[]);
      setIsLoading(false);
    };
    fetchPopups();
  }, []);

  const handleSaveOrder = async () => {
    const popupIds = currentPopups.map((popup) => popup.id);
    const result = await updatePopupOrder(popupIds);

    if (result.success) {
      setOriginalPopups(currentPopups); // 저장 성공 시 원본 데이터 업데이트
      setIsEditMode(false);
      alert('팝업 순서가 저장되었습니다.');
    } else {
      alert('순서 저장에 실패했습니다.');
    }
  };

  const handleCancelEdit = () => {
    setCurrentPopups(originalPopups); // 원본 데이터로 되돌리기
    setIsEditMode(false);
  };

  const handlePopupsReorder = (reorderedPopups: Popup[]) => {
    setCurrentPopups(reorderedPopups);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <PageTitle title="Popup" subTitle="팝업" />

      <PopupList
        popups={currentPopups}
        isEditMode={isEditMode}
        onPopupsReorder={handlePopupsReorder}
      />

      <PageFooter>
        {!isEditMode ? (
          <>
            <button
              onClick={() => setIsEditMode(true)}
              className="secondary-button"
              disabled={originalPopups.length === 0}
            >
              팝업 순서 변경
            </button>
            <Link href="/popup/add" className="primary-button">
              팝업 추가
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleCancelEdit} className="secondary-button">
              취소
            </button>
            <button onClick={handleSaveOrder} className="primary-button">
              순서 저장
            </button>
          </>
        )}
      </PageFooter>
    </div>
  );
}
