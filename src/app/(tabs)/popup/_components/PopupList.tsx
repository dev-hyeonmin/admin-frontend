'use client';

import { Popup } from '@/types/popup';
import DraggablePopupList from '@/app/(tabs)/popup/_components/DraggablePopupList';
import StaticPopupList from '@/app/(tabs)/popup/_components/StaticPopupList';

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
