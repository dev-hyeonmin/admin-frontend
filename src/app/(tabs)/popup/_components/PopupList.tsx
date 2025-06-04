'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import PopupPreview, { PopupPreviewProvider } from '@/app/(tabs)/popup/_components/PopupPreview';
import { EmptyState } from '@/components/EmptyState';
import { Smile } from 'lucide-react';
import PopupListItem from '@/app/(tabs)/popup/_components/PopupListItem';

interface Popup {
  id: number;
  title: string;
  image_url: string;
  order: number;
  created_at: Date;
}

interface PopupListProps {
  popups: Popup[];
  isEditMode?: boolean;
  onPopupsReorder?: (popups: Popup[]) => void;
}

export default function PopupList({ popups, isEditMode = false, onPopupsReorder }: PopupListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !isEditMode) {
      return;
    }

    const items = Array.from(popups);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onPopupsReorder?.(items);
  };

  return (
    <>
      {/* 팝업 리스트 */}
      <PopupPreviewProvider>
        {isEditMode && popups.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>팝업 순서 편집 모드</strong><br />
              드래그하여 팝업의 순서를 변경할 수 있습니다. 완료 후 '순서 저장' 버튼을 눌러주세요.
            </p>
          </div>
        )}
        
        {isEditMode ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="popup-list">
              {(provided) => (
                <div
                  className="space-y-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {popups.map((popup, index) => (
                    <Draggable
                      key={`popup-${popup.id}`}
                      draggableId={`popup-${popup.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`rounded-lg border p-4 transition-all ${
                            snapshot.isDragging
                              ? 'shadow-lg bg-blue-50 border-blue-200 rotate-2 scale-105'
                              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <PopupListItem {...popup} isEditMode={isEditMode} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="space-y-4">
            {popups.map((popup) => (
              <PopupListItem key={`popup-${popup.id}`} {...popup} isEditMode={isEditMode} />
            ))}
          </div>
        )}

        <PopupPreview />
      </PopupPreviewProvider>

      {/* 빈 리스트 */}
      {popups.length === 0 && (
        <EmptyState
          icon={Smile}
          title="📌 등록된 팝업이 없어요"
          description="지금 하나 추가해볼까요?"
        />
      )}
    </>
  );
}

// getOrderedPopupIds는 컴포넌트 내부에서 정의되었으므로 별도 export가 필요할 때 추가 컴포넌트로 분리해야 합니다.
