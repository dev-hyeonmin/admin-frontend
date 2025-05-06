'use client';

import { useActionState } from 'react';
import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';
import { handleAddNotice, FormState } from './action';
import { useRouter } from 'next/navigation';

const initialState: FormState = { title: '', content: '' };

export default function AddNotice() {
  const router = useRouter();
  const [state, dispatch] = useActionState(handleAddNotice, initialState);

  return (
    <div>
      <div className="py-6">
        <div className="text-3xl font-medium">Add Notice</div>
        <div className="text-sm text-zinc-500">공지사항 추가</div>
      </div>

      <form action={dispatch} className="mt-6 space-y-6">
        <div>
          <FormInput
            name="title"
            placeholder="제목"
            defaultValue={state?.title}
            errors={state?.error?.title}
            required
          />
        </div>

        <div>
          <textarea
            name="content"
            placeholder="내용"
            defaultValue={state?.content}
            className="min-h-[300px] w-full rounded-lg border border-gray-200 p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          {state?.error?.content?.map((error: string, index: number) => (
            <span key={index} className="font-medium text-red-500">
              {error}
            </span>
          ))}
        </div>

        {state?.error?.form?.map((error: string, index: number) => (
          <span key={index} className="font-medium text-red-500">
            {error}
          </span>
        ))}

        <div className="flex gap-4">
          <FormButton type="submit" text="저장" />
          <FormButton type="button" text="취소" variant="secondary" onClick={() => router.back()} />
        </div>
      </form>
    </div>
  );
}
