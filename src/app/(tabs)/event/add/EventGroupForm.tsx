'use client';

import FormDatePicker from '@/components/FormDatePicker';
import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import FromFileUpload from '@/components/FormFileUpload';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { formatDate } from '@/lib/utils';
import { EventFormData } from './page';

// validation
const eventGroupSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요'),
    startDate: z.string().date(),
    endDate: z.string().date(),
    imageUrl: z
      .any()
      .optional()
      .refine((file) => {
        if (!file || !file.size) return true;
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return validTypes.includes(file.type);
      }, 'PNG, JPG, JPEG 형식의 이미지만 업로드 가능해요.')
      .refine((file) => {
        if (!file || !file.size) return true;
        return file.size <= 200 * 1024;
      }, '이미지 크기는 200KB 이하여야 해요.'),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: '종료일은 시작일보다 이후여야 합니다',
      path: ['endDate'],
    }
  );

// type
interface EventGroupFormErrors {
  title?: string[];
  startDate?: string[];
  endDate?: string[];
  imageUrl?: string[];
}

interface EventGroupFormProps {
  formData: EventFormData;
  onSubmitAction: (data: EventFormData) => void;
  isSubmitting?: boolean;
}

export function EventGroupForm({
  formData,
  onSubmitAction,
  isSubmitting = false,
}: EventGroupFormProps) {
  const [errors, setErrors] = useState<EventGroupFormErrors>({});

  const [eventGroupForm, setEventGroupForm] = useState<EventFormData>(formData);

  const handleInputOnChange = (name: string, value: string | File | null) => {
    setEventGroupForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEventGroupFrom = () => {
    const validatedSchema = eventGroupSchema.safeParse(eventGroupForm);
    if (!validatedSchema.success) {
      setErrors(validatedSchema.error.flatten().fieldErrors);
      return;
    }

    // go next step!
    onSubmitAction(eventGroupForm);
  };

  return (
    <div className="space-y-6">
      <FormField label="이벤트 그룹명" required={true} htmlFor="startDate">
        <FormInput
          type="text"
          id="title"
          name="title"
          placeholder="예: 이달의 이벤트"
          defaultValue={formData.title}
          onChange={(e) => handleInputOnChange('title', e.target.value)}
          errors={errors.title}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="시작일" required={true} htmlFor="startDate">
          <FormDatePicker
            name="startDate"
            value={eventGroupForm.startDate ? new Date(eventGroupForm.startDate) : undefined}
            onChange={(date) => handleInputOnChange('startDate', date && formatDate(date, 'date'))}
            errors={errors.startDate}
          />
        </FormField>

        <FormField label="종료일" required={true} htmlFor="startDate">
          <FormDatePicker
            name="endDate"
            value={eventGroupForm.endDate ? new Date(eventGroupForm.endDate) : undefined}
            onChange={(date) => handleInputOnChange('endDate', date && formatDate(date, 'date'))}
            errors={errors.endDate}
          />
        </FormField>
      </div>

      {/* 이미지 업로드 영역 */}
      <FormField label="이벤트 배너">
        <FromFileUpload
          name="imageUrl"
          description="200KB 이하의 PNG, JPG, JPEG 파일만 가능해요"
          accept=".png,.jpg,.jpeg"
          initialFile={formData.imageUrl}
          onChange={(file) => {
            handleInputOnChange('imageUrl', file);
          }}
          errors={errors.imageUrl}
        />
      </FormField>

      {/* 하단 고정 메뉴 */}
      <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
        <Link
          href={'/event'}
          className="mr-4 rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 hover:bg-gray-50"
        >
          취소
        </Link>
        <button
          type="button"
          className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
          disabled={isSubmitting}
          onClick={validateEventGroupFrom}
        >
          {isSubmitting ? '처리 중...' : '다음 단계 넘어가기'}
        </button>
      </div>
    </div>
  );
}
