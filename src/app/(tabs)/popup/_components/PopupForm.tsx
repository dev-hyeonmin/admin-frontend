import FormInput from '@/components/FormInput';
import FromFileUpload from '@/components/FormFileUpload';
import { useActionState } from 'react';
import { handleAddPopup } from '@/app/(tabs)/popup/actions';
import PageFooter from '@/components/common/PageFooter';

export default function PopupForm() {
  const [state, formAction] = useActionState(handleAddPopup, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <FormInput
        label="팝업 제목"
        type="text"
        name="title"
        placeholder="예: 신규 클리닉 오픈 안내"
        errors={state?.fieldErrors?.title}
        required={true}
      />

      <FromFileUpload
        label="팝업 이미지"
        name="image"
        description="200KB 이하의 PNG, JPG, JPEG 파일만 가능해요"
        accept=".png,.jpg,.jpeg"
        errors={state?.fieldErrors?.image}
        required={true}
      />

      {/* Footer */}
      <PageFooter secondaryText="취소" secondaryAction="/popup" primaryText="팝업생성" />
    </form>
  );
}
