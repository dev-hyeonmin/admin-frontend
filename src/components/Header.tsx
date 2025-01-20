import Box from '@components/layout/box/Box.tsx';
import { useScrollHandler } from '@/hooks/useScrollHandler.ts';
import { useState } from 'react';
import Logo from '@components/common/Logo.tsx';
import { Link, useLocation } from 'react-router';

const Header = () => {
  const { isHeaderTop } = useScrollHandler();
  const location = useLocation();
  const path = location.pathname;
  const isHeaderDarkmode =
    isHeaderTop && !path.startsWith('/intro') && !path.startsWith('/products/'); // header dark mode condition
  const headerStyle = isHeaderDarkmode ? 'text-white' : 'bg-white border-b border-zinc-200';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${headerStyle}`}>
      <PCMenu isHeaderDarkmode={isHeaderDarkmode} />
      <MobileMenu isHeaderDarkmode={isHeaderDarkmode} />
    </header>
  );
};

export default Header;

/**
 * component
 */
interface MenuProps {
  className?: string;
  onClick?: () => void;
}

const Menu = ({ className, onClick }: MenuProps) => {
  return (
    <>
      <Link className={className} onClick={onClick} to="/intro">
        병원소개
      </Link>
      <Link className={className} onClick={onClick} to="/category">
        시술안내
      </Link>
      <Link className={className} onClick={onClick} to="/events">
        이벤트
      </Link>
      <Link className={className} to="https://pf.kakao.com/_pzyKM">
        상담하기
      </Link>
    </>
  );
};

interface MenuTypeProps {
  isHeaderDarkmode: boolean;
}

const PCMenu = ({ isHeaderDarkmode }: MenuTypeProps) => {
  return (
    <Box
      direction="horizontal"
      align="space-between"
      verticalAlign="middle"
      className={`hidden py-5 px-4 max-w-screen-xl mx-auto md:flex`}
    >
      <div className="relative">
        <Logo isDarkmode={isHeaderDarkmode} className="absolute -top-7 left-0" />
      </div>

      <Box direction="horizontal" verticalAlign="middle" className="gap-6">
        <Menu />

        <a
          target="_blank"
          href="https://map.naver.com/p/search/%EB%AE%A4%EC%A6%88%20%EC%84%BC%ED%85%80/place/36668483?placePath=?entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh"
          className={`ml-8 pt-2 pb-2.5 px-7 rounded-full font-semibold ${isHeaderDarkmode ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          예약하기
        </a>
      </Box>
    </Box>
  );
};

const MobileMenu = ({ isHeaderDarkmode }: MenuTypeProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
  };

  return (
    <Box
      direction="horizontal"
      align="space-between"
      verticalAlign="middle"
      className={`py-4 px-4 md:hidden`}
    >
      <button type="button" onClick={toggleMenu}>
        {isHeaderDarkmode ? (
          <img src="/assets/icon/icon-menu.png" alt="menu" className="size-8" />
        ) : (
          <img src="/assets/icon/icon-b-menu.png" alt="menu" className="size-8" />
        )}
      </button>

      <div className="relative">
        <Logo isDarkmode={isHeaderDarkmode} className="absolute -top-[27px] -left-16" />
      </div>

      <a href="tel:051-927-5222">
        {isHeaderDarkmode ? (
          <img src="/assets/icon/icon-phone.png" alt="phone" className="size-6" />
        ) : (
          <img src="/assets/icon/icon-b-phone.png" alt="phone" className="size-6" />
        )}
      </a>

      {isMenuOpen && (
        <Box
          direction="vertical"
          verticalAlign="middle"
          className="fixed w-full h-screen bg-white text-black top-0 left-0"
        >
          <Box
            align="space-between"
            verticalAlign="middle"
            className="w-full py-2 px-4 border-b border-zinc-200"
          >
            <Logo isDarkmode={false} className="w-32" />

            <button type="button" onClick={toggleMenu}>
              <img src="/assets/icon/icon-close.png" className="w-8" alt="close" />
            </button>
          </Box>

          <Box className="w-full border-b-8 border-zinc-100 text-center font-bold">
            <a
              target="_blank"
              href="https://pf.kakao.com/_pzyKM"
              className="flex flex-1 align-middle justify-center py-6 gap-2"
            >
              <img src="/assets/icon/icon-consult.png" alt="상담" className="size-6" />
              상담하기
            </a>
            <a
              target="_blank"
              href="https://map.naver.com/p/search/%EB%AE%A4%EC%A6%88%20%EC%84%BC%ED%85%80/place/36668483?placePath=?entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh"
              className="flex flex-1 align-middle justify-center py-6 gap-2 border-l border-zinc-200"
            >
              <img src="/assets/icon/icon-reservation.png" alt="예약" className="size-6" />
              예약하기
            </a>
          </Box>

          <Box direction="vertical" align="center" className="w-full py-8 px-4 gap-8 text-lg">
            <Menu className="w-full text-sm" onClick={toggleMenu} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
