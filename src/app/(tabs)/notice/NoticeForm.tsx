'use client';

import FormInput from '@/components/FormInput';
import { useRouter } from 'next/navigation';
import { FormEvent, useActionState } from 'react';
import FormField from '@/components/FormFiled';
import FromFileUpload from '@/components/FormFileUpload';
import PageTitle from '@/components/PageTitle';
import { handleAddNotice, handleEditNotice } from '@/app/(tabs)/notice/actions';

interface NoticeFormProps {
  id?: number;
  title?: string;
  content?: string;
}

export default function NoticeForm({ id, title, content }: NoticeFormProps) {
  const router = useRouter();
  const [state, dispatch] = useActionState(id ? handleEditNotice : handleAddNotice, undefined);

  // 폼 제출 전 확인 창을 띄우는 함수
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 확인 창 표시
    const confirmMessage = id ? '공지사항을 수정하시겠습니까?' : '새 공지사항을 추가하시겠습니까?';
    if (window.confirm(confirmMessage)) {
      // 사용자가 확인을 누른 경우에만 폼 제출
      const formData = new FormData(e.currentTarget);
      dispatch(formData);
    }
  };

  return (
    <div>
      <PageTitle
        title={id ? '공지사항 수정하기' : '공지사항 추가하기'}
        subTitle="무엇을 안내할지 적어주세요"
      />

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        {id && <input type="hidden" name="id" value={id} />}

        <FormField label="제목" required={true} htmlFor="title">
          <FormInput
            name="title"
            placeholder="예: 신규 클리닉 오픈 안내"
            errors={state?.fieldErrors?.title}
            defaultValue={state?.data?.title || title}
          />
        </FormField>

        <FormField label="내용" htmlFor="content">
          <textarea
            name="content"
            placeholder="공지사항 내용을 입력해주세요"
            className="min-h-80 w-full rounded-lg border border-gray-200 p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={state?.data?.content || content}
          />
          {state?.fieldErrors?.content?.map((error: string, index: number) => (
            <span
              key={index}
              className="mt-1 flex items-center gap-1 pl-0.5 text-sm font-medium text-red-500"
            >
              {error}
            </span>
          ))}
        </FormField>

        <FormField label="이미지 첨부">
          <FromFileUpload
            name="image"
            description="200KB 이하의 PNG, JPG, JPEG 파일만 가능해요"
            accept=".png,.jpg,.jpeg"
            errors={state?.fieldErrors?.image}
          />
        </FormField>

        {/* 하단 고정 메뉴 */}
        <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="mr-4 rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
