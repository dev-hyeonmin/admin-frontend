'use client';

import { useActionState } from 'react';
import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import PageFooter from '@/components/PageFooter';
import FormButton from '@/components/FormButton';
import { upsertBranch } from '@/app/admin/branch/action';
import Link from 'next/link';

interface BranchFormProps {
  id?: number;
  name?: string;
}

export default function BranchForm({ id, name }: BranchFormProps) {
  const [state, action, isPending] = useActionState(upsertBranch, null);

  return (
    <form action={action} className="space-y-6">
      <FormField label="이름" required={true} htmlFor="name">
        {id && <input type="hidden" name="id" value={id} />}

        <FormInput
          type="text"
          id="name"
          name="name"
          placeholder="예: 스마일클리닉"
          autoComplete="off"
          required={true}
          defaultValue={name}
          errors={state?.fieldErrors?.name}
        />
      </FormField>

      <PageFooter>
        <Link href={`/admin/branch`} className="secondary-button">
          취소
        </Link>

        <FormButton
          type="submit"
          variant="primary"
          fullWidth={false}
          text={id ? '지점 수정' : '지점 추가'}
          loadingText="지점 생성중..."
          disabled={isPending}
        />
      </PageFooter>
    </form>
  );
}
