import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import { getEvents } from '@/app/(tabs)/event/actions';
import { formatDate } from '@/lib/utils';
import DeleteEventButton from './DeleteEventButton';

export default async function Event() {
  const events = await getEvents();

  return (
    <div className="flex flex-col">
      <PageTitle title="Event" subTitle="이벤트" />

      {/* 헤더 */}
      <div className="flex pb-4 text-sm text-zinc-500">
        <div className="w-6/12">이벤트명</div>
        <div className="w-2/12 text-center">시작일</div>
        <div className="w-2/12 text-center">종료일</div>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={`event-${event.id}`} className="flex items-center">
            <div className="flex w-6/12 items-center gap-4">
              <div className="size-24 overflow-hidden rounded bg-gray-300">
                {/*<img src={image_url} alt={title} className="h-full w-full object-cover" />*/}
              </div>

              <div className="flex-1">
                <div className="text-lg font-medium">{event.title}</div>
                <div className="text-sm text-gray-400">
                  created at {formatDate(event.created_at, 'date')}
                </div>
              </div>
            </div>

            <div className="text-zinc-30 w-2/12 text-center font-medium">
              {formatDate(event.start_date, 'date')}
            </div>

            <div className="text-zinc-30 w-2/12 text-center font-medium">
              {event.end_date ? formatDate(event.end_date, 'date') : '진행중'}
            </div>

            <div className="w-2/12 font-medium text-zinc-500">
              <Link href={`/event/form/${event.id}`} className="px-4 hover:text-blue-600">
                수정
              </Link>

              <DeleteEventButton id={event.id} />
            </div>
          </div>
        ))}
      </div>

      {/* 하단 고정 메뉴 */}
      <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
        <Link
          href={'/event/form'}
          className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
        >
          이벤트 추가
        </Link>
      </div>
    </div>
  );
}
