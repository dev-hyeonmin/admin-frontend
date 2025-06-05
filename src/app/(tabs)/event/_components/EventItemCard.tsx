'use client';

import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { EventItem } from '@/types/event';

interface EventItemCardProps {
  item: EventItem;
  index: number;
  onEditAction: (item: EventItem) => void;
  onDeleteAction: (index: number) => void;
  isDragging?: boolean;
  isEditMode?: boolean;
}

const calculateDiscountPercentage = (originalPrice?: number | null, salePrice?: number | null) => {
  if (!originalPrice || !salePrice) return '0% 할인';
  return `${Math.round(((originalPrice - salePrice) / originalPrice) * 100)}% 할인`;
};

export function EventItemCard({
  item,
  index,
  onEditAction,
  onDeleteAction,
  isDragging = false,
  isEditMode = false,
}: EventItemCardProps) {
  return (
    <div
      key={`event-${item.title}-${index}`}
      className={`relative flex items-center gap-4 rounded-2xl border bg-white p-5 transition-all duration-200 ${
        isDragging
          ? 'scale-[1.02] border-blue-200 ring-2 ring-blue-100'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {isEditMode && (
        <div className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-5 w-5 text-gray-300" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="mb-1 truncate text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">{item.description}</p>
      </div>

      <div className="flex flex-col items-end text-right">
        {item.originalPrice && item.originalPrice > 0 && (
          <p className="mb-1 text-xs text-gray-400 line-through">
            {item.originalPrice.toLocaleString()}원
          </p>
        )}
        <p className="mb-1 text-xl font-bold text-gray-900">
          {item.salePrice?.toLocaleString() ?? 0}원
        </p>
        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
          {calculateDiscountPercentage(item.originalPrice, item.salePrice)}
        </span>
      </div>

      <div className="ml-3 flex flex-col gap-2">
        <button
          onClick={() => onEditAction(item)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-600 transition-colors duration-150 hover:bg-gray-100"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDeleteAction(index)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors duration-150 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
