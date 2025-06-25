'use client';

import FormInput from '@/components/FormInput';
import { useActionState } from 'react';
import FormField from '@/components/FormFiled';
import FromFileUpload from '@/components/FormFileUpload';
import { Notice } from '@/types/notice';
import PageFooter from '@/components/common/PageFooter';
import { upsertNotice } from '@/app/(tabs)/notice/actions';

interface NoticeFormProps {
  notice?: Notice;
}

export default function NoticeForm({ notice }: NoticeFormProps) {
  const { id, title, content, image_url } = notice || {};

  const [state, action, isPending] = useActionState(upsertNotice, {
    success: false,
    data: { title, content },
  });

  return (
    <form className="mt-6 space-y-6" action={action}>
      {id && <input type="hidden" name="id" value={id} />}

      <FormField label="제목" required={true} htmlFor="title">
        <FormInput
          name="title"
          placeholder="예: 신규 클리닉 오픈 안내"
          errors={state?.errors?.title}
          defaultValue={state?.data?.title as string}
        />
      </FormField>

      <FormField label="내용" htmlFor="content">
        <textarea
          name="content"
          placeholder="공지사항 내용을 입력해주세요"
          className="min-h-80 w-full rounded-lg border border-gray-200 p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          defaultValue={state?.data?.content as string}
        />
        {state?.errors?.content?.map((error: string, index: number) => (
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
          name="image_url"
          description="200KB 이하의 PNG, JPG, JPEG 파일만 가능해요"
          accept=".png,.jpg,.jpeg"
          errors={state?.errors?.image_url}
        />
      </FormField>

      {/* Footer */}
      <PageFooter
        secondaryText="취소"
        secondaryAction="/notice"
        primaryText={isPending ? '저장중이에요👀' : notice ? '공지사항 변경' : '공지사항 추가'}
      />
    </form>
  );
}
