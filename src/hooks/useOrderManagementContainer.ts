import { useEffect, useState } from 'react';

// 제네릭 인터페이스 정의
interface OrderableItem {
  id: number | string;
}

interface UseOrderManagementProps<T extends OrderableItem> {
  fetchItems: () => Promise<T[]>;
  updateOrder: (itemIds: (number | string)[]) => Promise<{ success: boolean }>;
  successMessage?: string;
  errorMessage?: string;
}

interface UseOrderManagementReturn<T> {
  originalItems: T[];
  currentItems: T[];
  isEditMode: boolean;
  isLoading: boolean;
  handleSaveOrder: () => Promise<void>;
  handleCancelEdit: () => void;
  handleItemsReorder: (reorderedItems: T[]) => void;
  handleStartEdit: () => void;
}

/**
 * 순서 관리를 위한 확장 가능한 커스텀 hook
 * @param fetchItems - 아이템들을 가져오는 함수
 * @param updateOrder - 아이템 순서를 업데이트하는 함수
 * @param successMessage - 성공 메시지 (기본값: '순서가 저장되었습니다.')
 * @param errorMessage - 실패 메시지 (기본값: '순서 저장에 실패했습니다.')
 */
export function useOrderManagement<T extends OrderableItem>({
  fetchItems,
  updateOrder,
  successMessage = '순서가 저장되었습니다.',
  errorMessage = '순서 저장에 실패했습니다.',
}: UseOrderManagementProps<T>): UseOrderManagementReturn<T> {
  const [originalItems, setOriginalItems] = useState<T[]>([]); // 서버에서 가져온 원본 데이터
  const [currentItems, setCurrentItems] = useState<T[]>([]); // 현재 표시되는 데이터 (편집 중일 때는 변경된 순서)
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchItems();
        setOriginalItems(data);
        setCurrentItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveOrder = async () => {
    try {
      const itemIds = currentItems.map((item) => item.id);
      const result = await updateOrder(itemIds);

      if (result.success) {
        setOriginalItems(currentItems); // 저장 성공 시 원본 데이터 업데이트
        setIsEditMode(false);
        alert(successMessage);
      } else {
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Failed to save order:', error);
      alert(errorMessage);
    }
  };

  const handleCancelEdit = () => {
    setCurrentItems(originalItems); // 원본 데이터로 되돌리기
    setIsEditMode(false);
  };

  const handleItemsReorder = (reorderedItems: T[]) => {
    setCurrentItems(reorderedItems);
  };

  const handleStartEdit = () => {
    setIsEditMode(true);
  };

  return {
    originalItems,
    currentItems,
    isEditMode,
    isLoading,
    handleSaveOrder,
    handleCancelEdit,
    handleItemsReorder,
    handleStartEdit,
  };
}
