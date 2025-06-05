'use client';

import Link from 'next/link';
import PageFooter from '@/components/PageFooter';
import FormButton from '@/components/FormButton';

interface EventManagementActionsProps {
  isEditMode: boolean;
  hasEvents: boolean;
  onStartEditAction: () => void;
  onCancelEditAction: () => void;
  onSaveOrderAction: () => void;
}

const BUTTON_TEXTS = {
  EDIT_ORDER: '이벤트 순서 변경',
  ADD_EVENT: '이벤트 추가',
  CANCEL: '취소',
  SAVE_ORDER: '순서 저장',
} as const;

export default function EventManagementActions({
  isEditMode,
  hasEvents,
  onStartEditAction,
  onCancelEditAction,
  onSaveOrderAction,
}: EventManagementActionsProps) {
  // 기본 액션
  const renderViewModeActions = () => (
    <>
      <FormButton
        onClick={onStartEditAction}
        variant="secondary"
        disabled={!hasEvents}
        fullWidth={false}
        text={BUTTON_TEXTS.EDIT_ORDER}
      />

      <Link href="/event/form" className="primary-button" aria-label="새로운 이벤트를 추가합니다">
        {BUTTON_TEXTS.ADD_EVENT}
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