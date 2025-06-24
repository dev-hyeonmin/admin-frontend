import { DropResult } from '@hello-pangea/dnd';

interface UseDragAndDropProps<T> {
  items: T[];
  onReorder: (reorderedItems: T[]) => void;
}

interface UseDragAndDropReturn {
  handleDragEnd: (result: DropResult) => void;
}

/**
 * 드래그 앤 드롭을 통한 배열 순서 변경을 위한 커스텀 hook
 * @param items - 순서를 변경할 배열
 * @param onReorder - 순서가 변경되었을 때 호출될 콜백 함수
 * @returns handleDragEnd 함수
 */
export function useDragAndDrop<T>({
  items,
  onReorder,
}: UseDragAndDropProps<T>): UseDragAndDropReturn {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    onReorder(reorderedItems);
  };

  return {
    handleDragEnd,
  };
}
