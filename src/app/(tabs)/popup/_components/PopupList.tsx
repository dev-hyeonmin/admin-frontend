'use client';

import { Popup } from '@/types/popup';
import PopupListItem from '@/app/(tabs)/popup/_components/PopupListItem';

interface PopupListProps {
  popups: Popup[];
  isEditMode?: boolean;
  onPopupsReorder?: (popups: Popup[]) => void;
}

export default function PopupList({ popups }: PopupListProps) {
  return (
    <div className="space-y-4">
      {popups.map((popup) => (
        <PopupListItem key={`popup-${popup.id}`} {...popup} isEditMode={false} />
      ))}
    </div>
  );
}

// interface PopupListProps {
//   popups: Popup[];
//   isEditMode?: boolean;
//   onPopupsReorder?: (popups: Popup[]) => void;
// }

// export default function PopupList({ popups, isEditMode = false, onPopupsReorder }: PopupListProps) {
//   return (
//     <PopupPreviewProvider>
//       {isEditMode ? (
//         <DraggablePopupList popups={popups} onPopupsReorderAction={onPopupsReorder!} />
//       ) : (
//         <StaticPopupList popups={popups} />
//       )}
//
//       <PopupPreview />
//     </PopupPreviewProvider>
//   );
// }

// getOrderedPopupIds는 컴포넌트 내부에서 정의되었으므로 별도 export가 필요할 때 추가 컴포넌트로 분리해야 합니다.
