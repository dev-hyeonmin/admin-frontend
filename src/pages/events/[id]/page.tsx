import { Link, useParams } from 'react-router';
import MaxScreenSize from '@components/common/MaxScreenSize.tsx';
import { eventGroups } from '@/pages/events/data.tsx';
import MainScreen from '@components/common/MainScreen.tsx';
import Box from '@components/layout/box/Box.tsx';
import { Helmet } from 'react-helmet-async';

const Event = () => {
  const { id } = useParams();
  const event = eventGroups.find((group) => group.id === Number(id));

  if (!event) {
    return <div>이벤트를 찾을 수 없습니다 :(</div>;
  }

  return (
    <div>
      <Helmet>
        <title>센텀스타의원 | {event.title}</title>
      </Helmet>

      <MainScreen title="이벤트" img="/assets/images/events-main.jpg" />

      <MaxScreenSize className="py-12 text-center md:py-28">
        <Box direction="vertical" verticalAlign="middle" className="gap-4 md:gap-6">
          <div className="text-xl font-semibold md:text-4xl">{event.title}</div>
          <div className="text-xs text-zinc-400 md:text-lg">
            {event.startDate} ~ {event.endDate}
          </div>
          <div
            className="text-sm md:text-xl"
            dangerouslySetInnerHTML={{ __html: event.description }}
          ></div>
        </Box>

        <Box align="center" className="mt-12 md:max-w-screen-lg md:mx-auto md:mt-28">
          <img src={event.content} alt={event.title} />
        </Box>

        <div className="mt-12 md:mt-28">
          <Link
            to="/events"
            className="px-6 py-2.5 bg-black text-white rounded-full text-sm md:px-10 md:py-4 md:text-xl"
          >
            이벤트 페이지로 돌아가기
          </Link>
        </div>
      </MaxScreenSize>
    </div>
  );
};

export default Event;
