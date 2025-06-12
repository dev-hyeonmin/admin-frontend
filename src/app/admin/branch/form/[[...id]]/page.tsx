'use client';

import PageTitle from '@/components/PageTitle';
import FormField from '@/components/FormFiled';
import FormInput from '@/components/FormInput';
import { useActionState } from 'react';
import PageFooter from '@/components/PageFooter';
import FormButton from '@/components/FormButton';
import { addBranch } from '@/app/admin/branch/form/action';

export default function BranchFormPage() {
  const [state, action, isPending] = useActionState(addBranch, null);

  return (
    <div>
      <PageTitle title="" subTitle="" />

      <form action={action} className="space-y-6">
        <FormField label="이름" required={true} htmlFor="name">
          <FormInput
            type="text"
            id="name"
            name="name"
            placeholder="예: 스마일클리닉"
            required={true}
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
    </div>
  );
}
