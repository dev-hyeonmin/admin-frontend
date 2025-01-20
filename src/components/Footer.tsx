import Box from '@components/layout/box/Box.tsx';
import Logo from '@components/common/Logo.tsx';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-zinc-200 md:py-28">
      <Box
        align="space-between"
        className="flex-col items-start gap-2 px-4 max-w-screen-xl mx-auto md:gap-0 md:flex-row md:items-center"
      >
        <Logo isDarkmode={false} />

        <Box align="center" verticalAlign="middle" className="gap-5 text-zinc-400 text-sm">
          <Link to="/policy?i=2">개인정보처리방침</Link>
          <div className={'w-[1px] h-3 bg-zinc-300'}></div>
          <Link to="/policy?i=0">이용약관</Link>
        </Box>
      </Box>

      <Box
        direction="vertical"
        className="px-4 mt-10 gap-2 text-sm max-w-screen-xl mx-auto md:gap-4"
      >
        <Box className="gap-2 md:gap-4">
          <p className="text-zinc-500 font-bold">상호명</p>
          <p className="text-zinc-400">센텀스타의원</p>
        </Box>

        <Box className="gap-2 md:gap-4">
          <p className="shrink-0 text-zinc-500 font-bold">주소</p>
          <p className="text-zinc-400">부산 해운대구 센텀2로 20 센텀타워메디컬 5층</p>
        </Box>

        <Box className="gap-2 md:gap-4">
          <p className="text-zinc-500 font-bold">대표 번호</p>
          <p className="text-zinc-400">051-927-5222</p>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
