import { useState } from 'react';

interface UseSortableListResult<T> {
  isEditMode: boolean;
  currentItems: T[];
  startEditMode: () => void;
  cancelEditMode: () => void;
  reorderItems: (reorderedItems: T[]) => void;
  saveOrder: (
    updateOrderFn: (itemIds: Array<number | string>) => Promise<{ success: boolean }>
  ) => Promise<void>;
}

export function useSortableList<T extends { id: number | string }>(
  initialItems: T[]
): UseSortableListResult<T> {
  const [originalItems, setOriginalItems] = useState<T[]>(initialItems);
  const [currentItems, setCurrentItems] = useState<T[]>(initialItems);
  const [isEditMode, setIsEditMode] = useState(false);

  const startEditMode = () => setIsEditMode(true);

  const cancelEditMode = () => {
    setCurrentItems(originalItems);
    setIsEditMode(false);
  };

  const reorderItems = (reorderedItems: T[]) => {
    setCurrentItems(reorderedItems);
  };

  const saveOrder = async (
    updateOrderFn: (itemIds: Array<number | string>) => Promise<{ success: boolean }>
  ) => {
    const itemIds = currentItems.map((item) => item.id);
    const result = await updateOrderFn(itemIds);

    if (!result.success) {
      alert('순서 저장 실패');
      return;
    }

    setOriginalItems(currentItems);
    alert('순서 저장 성공');
    setIsEditMode(false);
  };

  return {
    isEditMode,
    currentItems,
    startEditMode,
    cancelEditMode,
    reorderItems,
    saveOrder,
  };
}
