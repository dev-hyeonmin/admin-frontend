'use client';

import { useCallback, useEffect, useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { EventItemModal } from './EventItemModal';
import { EventFormData, EventItem } from '@/types/event';
import { EventItemCard } from './EventItemCard';
import PageFooter from '@/components/PageFooter';
import FormButton from '@/components/FormButton';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);
  const [eventItemData, setEventItemData] = useState<EventItem[]>(
    formData.map((item, index) => ({ ...item, order: item.order ?? index }))
  );

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
      prev.filter((_, i) => i !== index).map((item, newIndex) => ({ ...item, order: newIndex }))
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

  const handleDragEnd = useCallback(
    (result: DropResult) => {
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
    },
    [eventItemData]
  );

  // Update the event item when formData changes
  useEffect(() => {
    setEventItemData(formData.map((item, index) => ({ ...item, order: item.order ?? index })));
  }, [formData]);

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

      <PageFooter>
        <FormButton
          text="이전 단계"
          onClick={() => onCancelAction({ items: eventItemData })}
          variant="secondary"
          fullWidth={false}
        />

        <FormButton
          text={isSubmitting ? '잠시만요🙌' : isEdit ? '이벤트 수정하기' : '이벤트 생성하기'}
          onClick={() => onSubmitAction({ items: eventItemData })}
          fullWidth={false}
        />
      </PageFooter>
    </div>
  );
}
