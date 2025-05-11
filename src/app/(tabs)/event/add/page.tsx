import PageTitle from '@/components/PageTitle';
import { EventForm } from './EventForm';

export default function AddEvent() {
  return (
    <div className="flex flex-col">
      <PageTitle title="이벤트 추가" subTitle="새로운 이벤트를 등록합니다" />
      <EventForm />
    </div>
  );
}
