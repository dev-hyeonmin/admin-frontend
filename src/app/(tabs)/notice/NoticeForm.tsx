'use client';

import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { handleAddNotice } from '@/app/(tabs)/notice/add/action';
import { handleEditNotice } from '@/app/(tabs)/notice/[id]/edit/action';
import { useState } from 'react';

interface NoticeFormProps {
  notice?: {
    id: number;
    title: string;
    content: string;
  };
}

export default function NoticeForm({ notice }: NoticeFormProps) {
  const initialState = {
    title: notice?.title || '',
    content: notice?.content || '',
  };

  const router = useRouter();
  const [state, dispatch] = useActionState(
    notice ? handleEditNotice : handleAddNotice,
    initialState
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <div>
      <div className="py-6">
        <div className="text-3xl font-medium">{notice ? 'Edit Notice' : 'Add Notice'}</div>
        <div className="text-sm text-zinc-500">{notice ? '공지사항 수정' : '공지사항 추가'}</div>
      </div>

      <form action={dispatch} className="mt-6 space-y-6">
        {notice && <input type="hidden" name="id" value={notice.id} />}
        <div>
          <FormInput
            name="title"
            placeholder="제목"
            defaultValue={state?.title}
            // errors={state?.error?.title}
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
          {/*{state?.error?.content?.map((error: string, index: number) => (*/}
          {/*  <span key={index} className="font-medium text-red-500">*/}
          {/*    {error}*/}
          {/*  </span>*/}
          {/*))}*/}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">이미지 첨부</label>
          <div className="flex w-full items-center justify-center">
            <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
              {previewUrl ? (
                <div className="relative h-full w-full">
                  <img
                    src={previewUrl}
                    alt="미리보기"
                    className="h-full w-full rounded-lg object-contain"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setPreviewUrl(null);
                    }}
                    className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">클릭하여 업로드</span> 또는 드래그 앤 드롭
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (최대 10MB)</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {/*{state?.error?.form?.map((error: string, index: number) => (*/}
        {/*  <span key={index} className="font-medium text-red-500">*/}
        {/*    {error}*/}
        {/*  </span>*/}
        {/*))}*/}

        <div className="flex gap-4">
          <FormButton type="submit" text="저장" />
          <FormButton type="button" text="취소" variant="secondary" onClick={() => router.back()} />
        </div>
      </form>
    </div>
  );
}
