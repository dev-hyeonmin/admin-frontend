'use client';

import { ValidateEventGroupFrom, ValidateEventItemFrom } from '../actions';
import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';

interface EventGroupFormProps {
  onSubmit: (data: Record<string, FormDataEntryValue | null>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function EventItemForm({ onSubmit, onCancel, isSubmitting = false }: EventGroupFormProps) {
  const [state, formAction] = useActionState(ValidateEventItemFrom, undefined);
  const { pending } = useFormStatus();

  // form 제출 성공 시 실행될 콜백 함수
  const handleSuccess = () => {
    if (!state?.data) return;

    if (!confirm('입력한 내용으로 이벤트 만들까요?')) {
      return;
    }

    onSubmit(state.data);
  };

  // state가 변경될 때마다 실행
  useEffect(() => {
    if (state?.result === true) {
      handleSuccess();
    }
  }, [state]);

  return (
    <form action={formAction} className="mt-8 space-y-6">
      {/*<FormField label="이벤트 그룹명" required={true} htmlFor="startDate">*/}
      {/*  <FormInput*/}
      {/*    type="text"*/}
      {/*    id="title1"*/}
      {/*    name="title1"*/}
      {/*    placeholder="예: 이달의 이벤트"*/}
      {/*    // errors={state?.fieldErrors?.title}*/}
      {/*  />*/}
      {/*</FormField>*/}

      {/* 하단 고정 메뉴 */}
      <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
        <button
          type="button"
          className="mr-4 rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 hover:bg-gray-50"
          onClick={onCancel}
        >
          이전 단계
        </button>
        <button
          className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
          disabled={pending || isSubmitting}
        >
          {pending || isSubmitting ? '처리 중...' : '이벤트 생성하기'}
        </button>
      </div>
    </form>
  );
}
