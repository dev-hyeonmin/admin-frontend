'use client';

import PopupListItem from '@/app/(tabs)/popup/_components/PopupListItem';
import { Popup } from '@/types/popup';

interface StaticPopupListProps {
  popups: Popup[];
}

export default function StaticPopupList({ popups }: StaticPopupListProps) {
  return (
    <div className="space-y-4">
      {popups.map((popup) => (
        <PopupListItem key={`popup-${popup.id}`} {...popup} isEditMode={false} />
      ))}
    </div>
  );
}
