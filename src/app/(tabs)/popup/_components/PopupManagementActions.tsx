'use client';

import Link from 'next/link';
import PageFooter from '@/components/PageFooter';
import FormButton from '@/components/FormButton';

interface PopupManagementActionsProps {
  isEditMode: boolean;
  hasPopups: boolean;
  onStartEditAction: () => void;
  onCancelEditAction: () => void;
  onSaveOrderAction: () => void;
}

const BUTTON_TEXTS = {
  EDIT_ORDER: '팝업 순서 변경',
  ADD_POPUP: '팝업 추가',
  CANCEL: '취소',
  SAVE_ORDER: '순서 저장',
} as const;

export default function PopupManagementActions({
  isEditMode,
  hasPopups,
  onStartEditAction,
  onCancelEditAction,
  onSaveOrderAction,
}: PopupManagementActionsProps) {
  // 기본 액션
  const renderViewModeActions = () => (
    <>
      <FormButton
        onClick={onStartEditAction}
        variant="secondary"
        disabled={!hasPopups}
        fullWidth={false}
        text={BUTTON_TEXTS.EDIT_ORDER}
      />

      <Link href="/popup/add" className="primary-button" aria-label="새로운 팝업을 추가합니다">
        {BUTTON_TEXTS.ADD_POPUP}
      </Link>
    </>
  );

  // 편집 모드 일 때 액션
  const renderEditModeActions = () => (
    <>
      <FormButton
        onClick={onCancelEditAction}
        variant="secondary"
        fullWidth={false}
        text={BUTTON_TEXTS.CANCEL}
      />
      <FormButton
        onClick={onSaveOrderAction}
        variant="primary"
        fullWidth={false}
        text={BUTTON_TEXTS.SAVE_ORDER}
      />
    </>
  );

  return <PageFooter>{isEditMode ? renderEditModeActions() : renderViewModeActions()}</PageFooter>;
}
