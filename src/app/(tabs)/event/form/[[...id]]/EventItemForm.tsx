'use client';

import { useState, useCallback, useEffect } from 'react';
import { CirclePlus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { EventItemModal } from './EventItemModal';
import { EventFormData, EventItem } from '@/types/event';
import { EventItemCard } from './EventItemCard';

interface EventItemFormProps {
  formData?: EventItem[];
  onSubmitAction: (data: EventFormData) => void;
  onCancelAction: (data: EventFormData) => void;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function EventItemForm({
  formData = [],
  onSubmitAction,
  onCancelAction,
  isSubmitting = false,
  isEdit = false,
}: EventItemFormProps) {
  const [eventItemData, setEventItemData] = useState<EventItem[]>(
    formData.map((item, index) => ({ ...item, order: item.order ?? index }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);

  useEffect(() => {
    setEventItemData(formData.map((item, index) => ({ ...item, order: item.order ?? index })));
  }, [formData]);

  const handleAddEventItem = useCallback((item: EventItem) => {
    setEventItemData((prev) => [...prev, { ...item, order: prev.length }]);
    setIsModalOpen(false);
  }, []);

  const handleEditEventItem = useCallback(
    (item: EventItem) => {
      if (!editingItem) return;

      setEventItemData((prev) => prev.map((i) => (i === editingItem ? item : i)));
      setEditingItem(null);
      setIsModalOpen(false);
    },
    [editingItem]
  );

  const handleDeleteEventItem = useCallback((index: number) => {
    setEventItemData((prev) => 
      prev
        .filter((_, i) => i !== index)
        .map((item, newIndex) => ({ ...item, order: newIndex }))
    );
  }, []);

  const handleOpenEditModal = useCallback((item: EventItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingItem(null);
  }, []);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(eventItemData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // order 필드 업데이트
    const reorderedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setEventItemData(reorderedItems);
  }, [eventItemData]);

  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-blue-400 bg-blue-50/50 py-8 transition-colors hover:bg-blue-50"
        onClick={() => setIsModalOpen(true)}
      >
        <CirclePlus className="mb-2 h-8 w-8 text-blue-500" strokeWidth={1.2} />
        <p className="text-sm text-blue-600">이벤트를 추가해볼까요?</p>
        <p className="mt-1 text-xs text-blue-400">클릭해서 이벤트를 만들어보세요</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="event-items">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {eventItemData.map((item, index) => (
                <Draggable
                  key={`event-item-${item.title}-${index}`}
                  draggableId={`event-item-${item.title}-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <EventItemCard
                        item={item}
                        index={index}
                        onEditAction={handleOpenEditModal}
                        onDeleteAction={handleDeleteEventItem}
                        isDragging={snapshot.isDragging}
                        isEditMode={true}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <EventItemModal
        isOpen={isModalOpen}
        onCloseAction={handleCloseModal}
        onAddAction={handleAddEventItem}
        onEditAction={handleEditEventItem}
        editingItem={editingItem}
      />

      <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
        <button
          type="button"
          onClick={() => onCancelAction({ items: eventItemData })}
          className="mr-4 rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 hover:bg-gray-50"
        >
          이전 단계
        </button>
        <button
          type="button"
          className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
          disabled={isSubmitting}
          onClick={() => onSubmitAction({ items: eventItemData })}
        >
          {isSubmitting ? '처리 중...' : isEdit ? '이벤트 수정하기' : '이벤트 만들기'}
        </button>
      </div>
    </div>
  );
}
