import Box from '@components/layout/box/Box.tsx';
import { Link, useLocation } from 'react-router';

const IntroHeader = () => {
  const { pathname } = useLocation();

  return (
    <Box
      direction="vertical"
      align="center"
      verticalAlign="middle"
      className="pt-14 pb-12 text-center gap-8 md:pt-28 md:pb-28 md:gap-14"
    >
      <h2 className="pt-14 text-xl font-bold md:pt-20 md:text-5xl">병원 소개</h2>

      <Box
        align="center"
        verticalAlign="middle"
        className="gap-6 font-semibold text-zinc-400 md:mt-10 md:text-lg"
      >
        <Link to="/intro" className={pathname == '/intro' ? 'text-black' : ''}>
          클리닉
        </Link>

        <div className="border-r border-zinc-300 h-4"></div>

        <Link to="/intro/staff" className={pathname == '/intro/staff' ? 'text-black' : ''}>
          의사 · 스탭 소개
        </Link>
      </Box>
    </Box>
  );
};

export default IntroHeader;
