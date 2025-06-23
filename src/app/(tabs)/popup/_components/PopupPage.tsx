'use client';

import PageTitle from '@/components/PageTitle';
import { Popup } from '@/types/popup';
import PopupEmpty from '@/app/(tabs)/popup/_components/PopupEmpty';
import PopupList from '@/app/(tabs)/popup/_components/PopupList';
import PageFooter from '@/components/common/PageFooter';

interface PopupPageProps {
  popups: Popup[];
}

export default function PopupPage({ popups }: PopupPageProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <PageTitle title="Popup" subTitle="팝업" />

      {/* IS EMPTY */}
      {popups.length === 0 && <PopupEmpty />}

      {/* LIST */}
      {popups.length > 0 && <PopupList popups={popups} />}

      {/* Footer */}
      <PageFooter
        secondaryText="순서변경"
        secondaryAction={() => {}}
        primaryText="팝업생성"
        primaryAction="/popup/create"
      />
    </div>
  );
}
