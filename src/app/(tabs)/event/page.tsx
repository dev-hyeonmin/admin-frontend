'use client';

import PageTitle from '@/components/PageTitle';
import EventManagementContainer from '@/app/(tabs)/event/_components/EventManagementContainer';

export default function Event() {
  return (
    <div className="flex flex-col">
      <PageTitle title="Event" subTitle="이벤트" />
      <EventManagementContainer />
    </div>
  );
}
