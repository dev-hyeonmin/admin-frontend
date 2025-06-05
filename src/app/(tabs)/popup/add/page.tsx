'use client';

import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import { useActionState } from 'react';
import FormInput from '@/components/FormInput';
import FormField from '@/components/FormFiled';
import FromFileUpload from '@/components/FormFileUpload';
import { handleAddPopup } from '@/app/(tabs)/popup/actions';
import PageFooter from '@/components/PageFooter';

export default function AddPopup() {
  const [state, formAction] = useActionState(handleAddPopup, undefined);

  return (
    <div>
      <PageTitle title="새 팝업 만들기" subTitle="필요한 정보만 간단히 입력해주세요" />

      <form action={formAction}>
        <div className="flex flex-col gap-8">
          {/* 제목 입력 영역 */}
          <FormField label="팝업 제목" required={true} htmlFor="title">
            <FormInput
              type="text"
              id="title"
              name="title"
              placeholder="예: 신규 클리닉 오픈 안내"
              errors={state?.fieldErrors?.title}
            />
          </FormField>

          {/* 이미지 업로드 영역 */}
          <FormField label="팝업 이미지" required={true}>
            <FromFileUpload
              name="image"
              description="200KB 이하의 PNG, JPG, JPEG 파일만 가능해요"
              accept=".png,.jpg,.jpeg"
              errors={state?.fieldErrors?.image}
            />
          </FormField>
        </div>

        {/* 하단 고정 메뉴 */}
        <PageFooter>
          <Link
            href="/popup"
            className="mr-4 rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 hover:bg-gray-50"
          >
            취소
          </Link>
          <button className="primary-button">저장</button>
        </PageFooter>
      </form>
    </div>
  );
}
