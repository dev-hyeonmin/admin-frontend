import MainScreen from '@components/common/MainScreen.tsx';
import Box from '@components/layout/box/Box.tsx';
import MaxScreenSize from '@components/common/MaxScreenSize.tsx';
import Layout from '@components/layout/layout/Layout.tsx';
import Cell from '@components/layout/layout/Cell.tsx';
import { Link } from 'react-router';
import { eventGroups } from '@/pages/events/data.tsx';
import { useIsMobile } from '@/hooks/useIsMobile.ts';
import { Helmet } from 'react-helmet-async';

const Events = () => {
  const isMobile = useIsMobile();
  return (
    <div>
      <Helmet>
        <title>센텀스타의원 | 이벤트</title>
      </Helmet>

      <MainScreen title="이벤트" img="/assets/images/events-main.jpg" />

      <MaxScreenSize>
        <Layout className="w-full py-4 gap-y-14 md:gap-x-4 md:gap-y-20 md:py-28">
          {eventGroups.map((group) => (
            <Cell key={`group${group.id}`} span={isMobile ? 12 : 4}>
              <Link to={`/events/${group.id}`}>
                <Box direction="vertical" className="flex-1">
                  <div
                    className="w-full h-80 rounded-lg bg-zinc-200 bg-top bg-[length:110%]"
                    style={{ backgroundImage: `url(${group.thumbnail})` }}
                  ></div>

                  <div className="mt-4 pl-1 font-semibold md:text-xl">{group.title}</div>
                  <div className="mt-2 pl-1 text-zinc-400 text-sm md:text-base">
                    {group.startDate} ~ {group.endDate}
                  </div>
                </Box>
              </Link>
            </Cell>
          ))}
        </Layout>
      </MaxScreenSize>
    </div>
  );
};

export default Events;
