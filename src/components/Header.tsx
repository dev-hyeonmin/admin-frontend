import Logo from '@components/common/Logo.tsx';
import Box from '@components/layout/box/Box.tsx';
import { Link } from 'react-router';
import { HiOutlineFolder } from 'react-icons/hi';
import { HiOutlineStar } from 'react-icons/hi';
import { HiOutlineMinusCircle } from 'react-icons/hi';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-72 py-8 px-8 h-full z-50 bg-white border-r border-zinc-200">
      <Logo width="128px" />

      <Box direction="vertical" className="mt-16 gap-6">
        <Link to="/popup" className="text-zinc-500">
          <Box verticalAlign="middle" align="center" className="gap-4">
            <HiOutlineFolder className="text-xl" />
            팝업
          </Box>
        </Link>

        <Link to="/" className="text-zinc-500">
          <Box verticalAlign="middle" align="center" className="gap-4">
            <HiOutlineStar className="text-xl" />
            이벤트
          </Box>
        </Link>
      </Box>

      <button type="button" className="absolute bottom-8 left-0 px-8 text-zinc-500">
        <Box verticalAlign="middle" align="center" className="gap-4">
          <HiOutlineMinusCircle className="text-xl" />
          Log out
        </Box>
      </button>
    </header>
  );
};

export default Header;
