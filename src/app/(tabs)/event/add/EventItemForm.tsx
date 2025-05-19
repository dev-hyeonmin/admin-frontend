'use client';

import { useState } from 'react';
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';
import { EventFormData, EventItem } from './page';
import { EventItemModal } from './EventItemModal';

interface EventItemFormProps {
  formData?: EventItem[];
  onSubmitAction: (data: EventFormData) => void;
  onCancelAction: (data: EventFormData) => void;
  isSubmitting?: boolean;
}

export function EventItemForm({
  formData = [],
  onSubmitAction,
  onCancelAction,
  isSubmitting = false,
}: EventItemFormProps) {
  const [eventItemData, setEventItemData] = useState<EventItem[]>(formData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);

  const handleAddEventItem = (item: EventItem) => {
    // TODO: 이벤트 아이템 저장 로직 추가
    setEventItemData((prev) => [...prev, item]);
    setIsModalOpen(false);
  };

  const handleEditEventItem = (item: EventItem) => {
    if (editingItem) {
      setEventItemData((prev) => prev.map((i) => (i === editingItem ? item : i)));
    }
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleDeleteEventItem = (index: number) => {
    setEventItemData((prev) => prev.filter((_, i) => i !== index));
  };

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

      {eventItemData.map((item) => (
        <div
          key={`event-${item.title}`}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all"
        >
          <div className="flex items-center justify-between p-6">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <p className="text-xl font-bold text-gray-900">{item.title}</p>
                {/*<span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">*/}
                {/*  할인 이벤트*/}
                {/*</span>*/}
              </div>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>

            <div className="ml-6 flex flex-col items-end">
              <p className="text-sm text-gray-400 line-through">
                {item.originalPrice?.toLocaleString() ?? 0}원
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {item.salePrice?.toLocaleString() ?? 0}원
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item.originalPrice && item.salePrice
                  ? `${Math.round(((item.originalPrice - item.salePrice) / item.originalPrice) * 100)}% 할인`
                  : '0% 할인'}
              </p>
            </div>
          </div>

          <div className="absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => {
                setEditingItem(item);
                setIsModalOpen(true);
              }}
              className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
            >
              <Pencil width={20} height={20} />
            </button>
            <button
              onClick={() => {
                handleDeleteEventItem(eventItemData.indexOf(item));
              }}
              className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
            >
              <Trash2 width={20} height={20} />
            </button>
          </div>
        </div>
      ))}

      <EventItemModal
        isOpen={isModalOpen}
        onCloseAction={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onAddAction={handleAddEventItem}
        onEditAction={handleEditEventItem}
        editingItem={editingItem}
      />

      {/* 하단 고정 메뉴 */}
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
          {isSubmitting ? '처리 중...' : '이벤트 만들기'}
        </button>
      </div>
    </div>
  );
}
