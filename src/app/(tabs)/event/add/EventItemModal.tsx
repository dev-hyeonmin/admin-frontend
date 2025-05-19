'use client';

import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import { EventItem } from './page';
import { useState, useEffect } from 'react';
import { z } from 'zod';

// validation
const eventItemSchema = z.object({
  title: z.string().min(1, '어떤 이름으로 할까요?'),
  description: z.string().optional(),
  originalPrice: z.number().optional(),
  salePrice: z.number().min(1, '이벤트 가격은 필수 항목이에요.'),
});

// type
interface EventItemFormErrors {
  title?: string[];
  description?: string[];
  originalPrice?: string[];
  salePrice?: string[];
}

interface EventItemModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onAddAction: (item: EventItem) => void;
  onEditAction?: (item: EventItem) => void;
  editingItem?: EventItem | null;
}

export function EventItemModal({
  isOpen,
  onCloseAction,
  onAddAction,
  onEditAction,
  editingItem,
}: EventItemModalProps) {
  const [errors, setErrors] = useState<EventItemFormErrors>({});
  const [formData, setFormData] = useState<EventItem>({
    title: '',
  });

  // editingItem이 변경될 때마다 formData 업데이트
  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({ title: '' });
    }
  }, [editingItem]);

  const handleInputOnChange = (name: string, value: string | number | null) => {
    if (name === 'originalPrice' || name === 'salePrice') {
      setFormData((prev) => ({ ...prev, [name]: value ? Number(value) : 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateEventItemFrom = () => {
    const validatedSchema = eventItemSchema.safeParse(formData);
    if (!validatedSchema.success) {
      setErrors(validatedSchema.error.flatten().fieldErrors);
      return;
    }

    if (editingItem && onEditAction) {
      onEditAction(validatedSchema.data);
    } else {
      onAddAction(validatedSchema.data);
    }
    onCloseAction();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-10" />

      <div className="z-10 flex w-full max-w-md flex-col gap-6 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          {editingItem ? '이벤트 아이템 수정' : '이벤트 아이템 추가'}
        </h2>
        <FormField label="이벤트명" required={true} htmlFor="title">
          <FormInput
            type="text"
            id="title"
            name="title"
            placeholder="예: 여드름 관리 3회 패키지"
            defaultValue={formData.title}
            onChange={(e) => handleInputOnChange('title', e.target.value)}
            errors={errors.title}
          />
        </FormField>

        <FormField label="이벤트 설명" htmlFor="description">
          <FormInput
            type="text"
            id="description"
            name="description"
            placeholder="어떤 이벤트인지 소개해 주세요"
            defaultValue={formData.description}
            onChange={(e) => handleInputOnChange('description', e.target.value)}
            errors={errors.description}
          />
        </FormField>

        <FormField label="원래 가격" htmlFor="originalPrice">
          <FormInput
            type="number"
            id="originalPrice"
            name="originalPrice"
            placeholder="예: 10000"
            defaultValue={formData.originalPrice}
            onChange={(e) => handleInputOnChange('originalPrice', e.target.value)}
            errors={errors.originalPrice}
          />
        </FormField>

        <FormField label="할인된 가격" required={true} htmlFor="salePrice">
          <FormInput
            type="number"
            id="salePrice"
            name="salePrice"
            placeholder="예: 8000"
            defaultValue={formData.salePrice}
            onChange={(e) => handleInputOnChange('salePrice', e.target.value)}
            errors={errors.salePrice}
          />
        </FormField>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCloseAction}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={validateEventItemFrom}
            className="flex-1 rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
          >
            {editingItem ? '수정하기' : '추가하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
