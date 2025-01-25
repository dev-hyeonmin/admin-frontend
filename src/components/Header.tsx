import Logo from '@components/common/Logo.tsx';
import Box from '@components/layout/box/Box.tsx';
import { Link } from 'react-router';
import { HiOutlineFolder } from 'react-icons/hi';
import { HiOutlineStar } from 'react-icons/hi';
import { HiOutlineMinusCircle } from 'react-icons/hi';
import { LuUsersRound } from 'react-icons/lu';
import { FiList } from 'react-icons/fi';
import { IoMdClipboard } from 'react-icons/io';

const menus = [
  {
    name: '의료진 관리',
    link: '/staff',
    icon: <LuUsersRound className="text-xl" />,
  },
  {
    name: '팝업',
    link: '/popup',
    icon: <HiOutlineFolder className="text-xl" />,
  },
  {
    name: '카테고리',
    link: '/category',
    icon: <FiList className="text-xl" />,
  },
  {
    name: '상세페이지',
    link: '/product',
    icon: <IoMdClipboard className="text-xl" />,
  },
  {
    name: '이벤트',
    link: '/event',
    icon: <HiOutlineStar className="text-xl" />,
  },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-64 py-8 px-8 h-full z-50 bg-white border-r border-zinc-200">
      <Logo width="128px" />

      <Box direction="vertical" className="mt-16 gap-8">
        {menus.map((menu) => (
          <Link
            key={menu.link}
            to={menu.link}
            className="w-full text-zinc-500 hover:text-zinc-900 hover:font-bold transition"
          >
            <Box verticalAlign="middle" className="gap-4">
              {menu.icon}
              {menu.name}
            </Box>
          </Link>
        ))}
      </Box>

      <button
        type="button"
        className="absolute bottom-8 left-0 px-8 text-zinc-500 hover:text-red-700"
      >
        <Box verticalAlign="middle" align="center" className="gap-4">
          <HiOutlineMinusCircle className="text-xl" />
          Log out
        </Box>
      </button>
    </header>
  );
};

export default Header;
