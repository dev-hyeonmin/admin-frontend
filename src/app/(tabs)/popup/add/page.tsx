'use client';

import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import { useActionState } from 'react';
import { handleAddPopup } from '@/app/(tabs)/popup/add/action';

export default function AddPopup() {
  const [state, formAction] = useActionState(handleAddPopup, { errors: {} });

  return (
    <div className="flex min-h-screen flex-col">
      <PageTitle title="팝업 추가" subTitle="새로운 팝업을 등록합니다" />

      <form action={formAction}>
        <div className="flex-1 px-12 py-8">
          <div className="mx-auto max-w-2xl">
            {/* 제목 입력 영역 */}
            <div className="mb-8">
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                팝업 제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="팝업 제목을 입력하세요"
              />
            </div>

            {/* 이미지 업로드 영역 */}
            <div className="mb-8">
              <label className="mb-2 block text-sm font-medium text-gray-700">팝업 이미지</label>
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="image-upload"
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="mb-3 h-10 w-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">클릭하여 이미지 업로드</span>
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (최대 10MB)</p>
                  </div>
                  <input id="image-upload" type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고정 메뉴 */}
        <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
          <Link
            href="/popup"
            className="mr-4 rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 hover:bg-gray-50"
          >
            취소
          </Link>
          <button className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600">
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
