'use client';

import { Popup } from '@/types/popup';
import StaticPopupList from '@/app/(tabs)/popup/_components/StaticPopupList';
import DraggablePopupList from '@/app/(tabs)/popup/_components/DraggablePopupList';

interface PopupListProps {
  popups: Popup[];
  handleItemsReorderAction: (popups: Popup[]) => void;
  isEditMode?: boolean;
}

export default function PopupList({
  popups,
  handleItemsReorderAction,
  isEditMode = false,
}: PopupListProps) {
  if (isEditMode) {
    return <DraggablePopupList popups={popups} onPopupsReorderAction={handleItemsReorderAction} />;
  }

  return <StaticPopupList popups={popups} />;
}
