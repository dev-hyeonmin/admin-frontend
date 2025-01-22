import { Link } from 'react-router';

interface LogoProps {
  width?: string;
}

const Logo = ({}: LogoProps) => {
  return (
    <Link to="/" className="text-2xl font-bold text-zinc-800">
      {/*<img src="/assets/logo-b.png" width={width} alt="clinic" />*/}
      Web Admin
    </Link>
  );
};

export default Logo;
