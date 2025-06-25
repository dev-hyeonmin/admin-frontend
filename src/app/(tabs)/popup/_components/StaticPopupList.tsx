'use client';

import PopupItem from '@/app/(tabs)/popup/_components/PopupItem';
import { Popup } from '@/types/popup';

interface StaticPopupListProps {
  popups: Popup[];
}

export default function StaticPopupList({ popups }: StaticPopupListProps) {
  return (
    <div>
      {popups.map((popup) => (
        <PopupItem key={`popup-${popup.id}`} popup={popup} isEditMode={false} />
      ))}
    </div>
  );
}
