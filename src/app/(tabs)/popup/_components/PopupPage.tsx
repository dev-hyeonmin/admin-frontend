'use client';

import PageTitle from '@/components/PageTitle';
import { Popup } from '@/types/popup';
import PopupEmpty from '@/app/(tabs)/popup/_components/PopupEmpty';
import PopupList from '@/app/(tabs)/popup/_components/PopupList';
import PopupPageFooter from '@/app/(tabs)/popup/_components/PopupPageFooter';
import { useSortableList } from '@/hooks/useSortableList';
import { updatePopupOrder } from '@/app/(tabs)/popup/actions';

interface PopupPageProps {
  popups: Popup[];
}

export default function PopupPage({ popups }: PopupPageProps) {
  const { currentItems, isEditMode, startEditMode, cancelEditMode, reorderItems, saveOrder } =
    useSortableList(popups);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <PageTitle title="Popup" subTitle="팝업" />

      {/* IS EMPTY */}
      {popups.length === 0 && <PopupEmpty />}

      {/* LIST */}
      {popups.length > 0 && (
        <PopupList
          isEditMode={isEditMode}
          popups={currentItems}
          handleItemsReorderAction={reorderItems}
        />
      )}

      {/* Footer */}
      <PopupPageFooter
        isEditMode={isEditMode}
        startEditMode={startEditMode}
        cancelEditMode={cancelEditMode}
        saveOrder={() => saveOrder(updatePopupOrder)}
      />
    </div>
  );
}
