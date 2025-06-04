'use client';

import PageTitle from '@/components/PageTitle';
import PopupManagementContainer from '@/app/(tabs)/popup/_components/PopupManagementContainer';

// 레이아웃
export default function Popup() {
  return (
    <div className="flex flex-col">
      <PageTitle title="Popup" subTitle="팝업" />
      <PopupManagementContainer />
    </div>
  );
}
