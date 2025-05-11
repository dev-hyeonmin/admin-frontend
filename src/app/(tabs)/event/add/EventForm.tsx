'use client';

import { useRouter } from 'next/navigation';
import { createEvent } from '../action';
import { useActionState, useState } from 'react';
import Image from 'next/image';

export function EventForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(createEvent, { errors: {} });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          이벤트 제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            시작일
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            종료일
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          이벤트 이미지
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          required
        />
        {previewImage && (
          <div className="relative mt-2 h-48 w-full">
            <Image
              src={previewImage}
              alt="이벤트 이미지 미리보기"
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/*{state.error && <div className="text-sm text-red-600">{state.error.message}</div>}*/}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="submit"
          // disabled={state.isLoading}
          className="rounded-lg bg-blue-700 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {/*{state.isLoading ? '저장 중...' : '저장'}*/}
        </button>
      </div>
    </form>
  );
}
