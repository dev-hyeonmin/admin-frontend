'use client';

import { ValidateEventGroupFrom } from '../actions';
import FormDatePicker from '@/components/FormDatePicker';
import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import FromFileUpload from '@/components/FormFileUpload';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';

interface EventGroupFormProps {
  onSubmit: (data: Record<string, FormDataEntryValue | null>) => void;
  isSubmitting?: boolean;
}

export function EventGroupForm({ onSubmit, isSubmitting = false }: EventGroupFormProps) {
  const [state, formAction] = useActionState(ValidateEventGroupFrom, undefined);
  const { pending } = useFormStatus();

  // form 제출 성공 시 실행될 콜백 함수
  const handleSuccess = () => {
    if (!state?.data) return;
    onSubmit(state.data);
  };

  useEffect(() => {
    if (state?.result === true) {
      handleSuccess();
    }
  }, [state]);

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <FormField label="이벤트 그룹명" required={true} htmlFor="startDate">
        <FormInput
          type="text"
          id="title"
          name="title"
          placeholder="예: 이달의 이벤트"
          errors={state?.fieldErrors?.title}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="시작일" required={true} htmlFor="startDate">
          <FormDatePicker
            name="startDate"
            value={String(state?.data?.startDate)}
            errors={state?.fieldErrors?.startDate}
          />
        </FormField>

        <FormField label="종료일" required={true} htmlFor="startDate">
          <FormDatePicker name="endDate" errors={state?.fieldErrors?.endDate} />
        </FormField>
      </div>

      {/* 이미지 업로드 영역 */}
      <FormField label="이벤트 배너">
        <FromFileUpload
          name="image"
          description="200KB 이하의 PNG, JPG, JPEG 파일만 가능해요"
          accept=".png,.jpg,.jpeg"
          errors={state?.fieldErrors?.image}
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
          className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
          disabled={pending || isSubmitting}
        >
          {pending || isSubmitting ? '처리 중...' : '다음 단계 넘어가기'}
        </button>
      </div>
    </form>
  );
}
