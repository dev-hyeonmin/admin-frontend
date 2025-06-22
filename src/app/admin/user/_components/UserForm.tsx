'use client';

import { useActionState } from 'react';
import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import PageFooter from '@/components/PageFooter';
import FormButton from '@/components/FormButton';
import { addUser, updateUser } from '@/app/admin/user/action';
import { Branch } from '@/types/branch';
import { UserData } from '@/types/user';
import Link from 'next/link';

interface UserFormProps {
  user?: UserData;
  branches: Branch[];
}

export default function UserForm({ user, branches = [] }: UserFormProps) {
  const userAction = user ? updateUser : addUser;
  const [state, action, isPending] = useActionState(userAction, {
    success: false,
    error: {
      formErrors: [],
    },
    data: {
      name: user?.name || '',
      email: user?.email || '',
      branchId: user?.branch.id ? String(user.branch.id) : '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form action={action} className="space-y-6">
      {user && <input type="hidden" name="id" value={user?.id} />}

      <FormField label="이름" required={true} htmlFor="name">
        <FormInput
          type="text"
          id="name"
          name="name"
          placeholder="예: 홍길동"
          required={true}
          defaultValue={state?.data?.name}
          errors={state?.error?.name}
        />
      </FormField>

      <FormField label="이메일" required={true} htmlFor="email">
        <FormInput
          type="email"
          id="email"
          name="email"
          placeholder="예: user@example.com"
          required={true}
          defaultValue={state?.data?.email}
          errors={state?.error?.email}
        />
      </FormField>

      <FormField label="비밀번호" required={!user} htmlFor="password">
        <FormInput
          type="password"
          id="password"
          name="password"
          placeholder="8자 이상"
          required={!user}
          defaultValue={state?.data?.password}
          errors={state?.error?.password}
        />
      </FormField>

      <FormField label="비밀번호 확인" required={!user} htmlFor="password">
        <FormInput
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="8자 이상"
          required={!user}
          errors={state?.error?.confirmPassword}
        />
      </FormField>

      <FormField label="지점" required={true} htmlFor="branchId">
        <select
          id="branchId"
          name="branchId"
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
          required
          defaultValue={state?.data?.branchId}
        >
          <option value="">지점을 선택해주세요</option>
          {branches.map((branch) => (
            <option key={branch.id} value={String(branch.id)}>
              {branch.name}
            </option>
          ))}
        </select>
      </FormField>

      <PageFooter>
        <Link href={`/admin/user`} className="secondary-button">
          취소
        </Link>

        <FormButton
          type="submit"
          fullWidth={false}
          text={user ? '사용자 수정' : '사용자 추가'}
          loadingText={user ? '사용자 수정중...' : '사용자 생성중...'}
          disabled={isPending}
        />
      </PageFooter>
    </form>
  );
}
