'use client';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import PopupListItem from '@/app/(tabs)/popup/_components/PopupListItem';
import { Popup } from '@/types/popup';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

interface DraggablePopupListProps {
  popups: Popup[];
  onPopupsReorderAction: (popups: Popup[]) => void;
}

export default function DraggablePopupList({
  popups,
  onPopupsReorderAction,
}: DraggablePopupListProps) {
  const { handleDragEnd } = useDragAndDrop<Popup>({
    items: popups,
    onReorder: onPopupsReorderAction,
    isEditMode: true,
  });

  return (
    <>
      {/* 편집 모드 안내 */}
      <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
        <p className="text-sm text-blue-700">
          <strong>팝업 순서 편집 모드</strong>
          <br />
          드래그하여 팝업의 순서를 변경할 수 있습니다. 완료 후 [순서 저장] 버튼을 눌러주세요.
        </p>
      </div>

      {/* 드래그 앤 드롭 리스트 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="popup-list">
          {(provided) => (
            <div className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
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
                          ? 'scale-105 rotate-2 border-blue-200 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <PopupListItem {...popup} isEditMode={true} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
