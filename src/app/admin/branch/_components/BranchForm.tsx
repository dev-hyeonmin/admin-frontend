'use client';

import { useActionState } from 'react';
import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import PageFooter from '@/components/PageFooter';
import FormButton from '@/components/FormButton';
import { upsertBranch } from '@/app/admin/branch/action';

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
          required={true}
          defaultValue={name}
          errors={state?.fieldErrors?.name}
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
          text="지점 추가"
          loadingText="지점 생성중..."
          disabled={isPending}
        />
      </PageFooter>
    </form>
  );
}
