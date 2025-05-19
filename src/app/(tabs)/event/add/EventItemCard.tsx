'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { EventItem } from './page';

interface EventItemCardProps {
  item: EventItem;
  index: number;
  onEditAction: (item: EventItem) => void;
  onDeleteAction: (index: number) => void;
}

const calculateDiscountPercentage = (originalPrice?: number, salePrice?: number) => {
  if (!originalPrice || !salePrice) return '0% 할인';
  return `${Math.round(((originalPrice - salePrice) / originalPrice) * 100)}% 할인`;
};

export function EventItemCard({ item, index, onEditAction, onDeleteAction }: EventItemCardProps) {
  return (
    <div
      key={`event-${item.title}-${index}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all"
    >
      <div className="flex items-center justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold text-gray-900">{item.title}</p>
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
            {calculateDiscountPercentage(item.originalPrice, item.salePrice)}
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEditAction(item)}
          className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
        >
          <Pencil width={20} height={20} />
        </button>
        <button
          onClick={() => onDeleteAction(index)}
          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
        >
          <Trash2 width={20} height={20} />
        </button>
      </div>
    </div>
  );
} 