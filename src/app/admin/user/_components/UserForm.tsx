'use client';

import { useActionState } from 'react';
import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import PageFooter from '@/components/PageFooter';
import FormButton from '@/components/FormButton';
import { upsertUser } from '@/app/admin/user/action';
import { Branch } from '@prisma/client';

interface UserFormProps {
  id?: number;
  name?: string;
  email?: string;
  branchId?: number;
  branches: Branch[];
}

export default function UserForm({ id, name, email, branchId, branches = [] }: UserFormProps) {
  const [state, action, isPending] = useActionState(upsertUser, null);

  return (
    <form action={action} className="space-y-6">
      {id && <input type="hidden" name="id" value={id} />}

      <FormField label="이름" required={true} htmlFor="name">
        <FormInput
          type="text"
          id="name"
          name="name"
          placeholder="예: 홍길동"
          required={true}
          defaultValue={name}
          errors={state?.fieldErrors?.name}
        />
      </FormField>

      <FormField label="이메일" required={true} htmlFor="email">
        <FormInput
          type="email"
          id="email"
          name="email"
          placeholder="예: user@example.com"
          required={true}
          defaultValue={email}
          errors={state?.fieldErrors?.email}
        />
      </FormField>

      <FormField label="비밀번호" required={true} htmlFor="password">
        <FormInput
          type="password"
          id="password"
          name="password"
          placeholder="8자 이상"
          required={true}
          errors={state?.fieldErrors?.password}
        />
      </FormField>

      <FormField label="지점" required={true} htmlFor="branchId">
        <select
          id="branchId"
          name="branchId"
          defaultValue={branchId}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
          required
        >
          <option value="">지점을 선택해주세요</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
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
          text={id ? '사용자 수정' : '사용자 추가'}
          loadingText={id ? '사용자 수정중...' : '사용자 생성중...'}
          disabled={isPending}
        />
      </PageFooter>
    </form>
  );
}
