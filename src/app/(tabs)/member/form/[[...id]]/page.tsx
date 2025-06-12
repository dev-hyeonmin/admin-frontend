'use client';

import React from 'react';
import PageTitle from '@/components/PageTitle';
import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import { useActionState } from 'react';
import { addMembers } from '@/app/(tabs)/member/action';
import PageFooter from '@/components/PageFooter';
import FormButton from '@/components/FormButton';

export default function MemberFormPage() {
  const [state, action, isPending] = useActionState(addMembers, null);

  return (
    <div>
      <PageTitle title="멤버 추가" subTitle="새로운 멤버 정보를 입력해주세요" />

      <form action={action} className="space-y-6">
        <FormField label="이름" required={true} htmlFor="name">
          <FormInput
            type="text"
            id="name"
            name="name"
            placeholder="홍길동"
            required={true}
            errors={state?.fieldErrors?.name}
          />
        </FormField>

        <FormField label="이메일" required={true} htmlFor="email">
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            required={true}
            errors={state?.fieldErrors?.email}
          />
        </FormField>

        <FormField label="비밀번호" required={true} htmlFor="password">
          <FormInput
            type="password"
            id="password"
            name="password"
            placeholder="8자 이상 입력해주세요"
            required={true}
            errors={state?.fieldErrors?.password}
          />
        </FormField>

        <PageFooter>
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            취소
          </button>

          <FormButton
            type="submit"
            text="사용자 추가"
            loadingText="사용자 생성중..."
            disabled={isPending}
          />
        </PageFooter>
      </form>
    </div>
  );
}
