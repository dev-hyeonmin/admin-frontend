'use client';

import PopupPreview, { PopupPreviewProvider } from '@/app/(tabs)/popup/_components/PopupPreview';
import DraggablePopupList from '@/app/(tabs)/popup/_components/DraggablePopupList';
import StaticPopupList from '@/app/(tabs)/popup/_components/StaticPopupList';
import { EmptyState } from '@/components/EmptyState';
import { Smile } from 'lucide-react';
import { Popup } from '@/types/popup';

interface PopupListProps {
  popups: Popup[];
  isEditMode?: boolean;
  onPopupsReorder?: (popups: Popup[]) => void;
}

export default function PopupList({ popups, isEditMode = false, onPopupsReorder }: PopupListProps) {
  // 빈 리스트 처리
  if (popups.length === 0) {
    return (
      <EmptyState
        icon={Smile}
        title="📌 등록된 팝업이 없어요"
        description="지금 하나 추가해볼까요?"
      />
    );
  }

  return (
    <PopupPreviewProvider>
      {isEditMode ? (
        <DraggablePopupList popups={popups} onPopupsReorderAction={onPopupsReorder!} />
      ) : (
        <StaticPopupList popups={popups} />
      )}

      <PopupPreview />
    </PopupPreviewProvider>
  );
}

// getOrderedPopupIds는 컴포넌트 내부에서 정의되었으므로 별도 export가 필요할 때 추가 컴포넌트로 분리해야 합니다.
