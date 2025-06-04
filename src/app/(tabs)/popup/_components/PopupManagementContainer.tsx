'use client';

import PopupList from '@/app/(tabs)/popup/_components/PopupList';
import PopupManagementActions from '@/app/(tabs)/popup/_components/PopupManagementActions';
import { useOrderManagement } from '@/hooks/useOrderManagementContainer';
import { Popup } from '@/types/popup';
import { getPopups, updatePopupOrder } from '@/app/(tabs)/popup/actions';

// 기존 팝업 전용 훅을 새로운 제네릭 훅을 사용하도록 변경
export function usePopupManagementContainer() {
  return useOrderManagement<Popup>({
    fetchItems: async () => {
      const data = await getPopups();
      return data as unknown as Popup[];
    },
    updateOrder: async (popupIds) => {
      return await updatePopupOrder(popupIds as number[]);
    },
    successMessage: '팝업 순서가 저장되었습니다.',
    errorMessage: '팝업 순서 저장에 실패했습니다.',
  });
}

export default function PopupManagementContainer() {
  const {
    originalItems,
    currentItems,
    isEditMode,
    isLoading,
    handleSaveOrder,
    handleCancelEdit,
    handleItemsReorder,
    handleStartEdit,
  } = usePopupManagementContainer();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PopupList
        popups={currentItems}
        isEditMode={isEditMode}
        onPopupsReorder={handleItemsReorder}
      />

      <PopupManagementActions
        isEditMode={isEditMode}
        hasPopups={originalItems.length > 0}
        onStartEditAction={handleStartEdit}
        onCancelEditAction={handleCancelEdit}
        onSaveOrderAction={handleSaveOrder}
      />
    </>
  );
}
