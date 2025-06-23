import PageFooter from '@/components/common/PageFooter';

interface PopupPageFooterProps {
  isEditMode: boolean;
  startEditMode: () => void;
  cancelEditMode: () => void;
  saveOrder: () => void;
}

export default function PopupPageFooter({
  isEditMode,
  startEditMode,
  cancelEditMode,
  saveOrder,
}: PopupPageFooterProps) {
  if (isEditMode) {
    // 편집 모드일 경우 순서 저장
    return (
      <PageFooter
        secondaryText="취소"
        secondaryAction={cancelEditMode}
        primaryText="순서저장"
        primaryAction={saveOrder}
      />
    );
  }

  return (
    <PageFooter
      secondaryText="팝업 순서 변경"
      secondaryAction={startEditMode}
      primaryText="팝업생성"
      primaryAction="/popup/create"
    />
  );
}
