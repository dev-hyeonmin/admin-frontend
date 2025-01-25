import { Link } from 'react-router';
import { IoIosAnalytics } from 'react-icons/io';

interface LogoProps {
  width?: string;
}

const Logo = ({}: LogoProps) => {
  return (
    <Link to="/" className="text-xl font-bold text-blue-600">
      {/*<img src="/assets/logo-b.png" width={width} alt="clinic" />*/}
      <IoIosAnalytics className="text-3xl" />
      A:dmin
    </Link>
  );
};

export default Logo;
