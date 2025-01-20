import { Link } from 'react-router';

interface LogoProps {
  isDarkmode: boolean;
  className?: string;
}

const Logo = ({ isDarkmode, className }: LogoProps) => {
  return (
    <Link to="/" className={`w-32 text-lg font-bold md:text-2xl ${className}`}>
      {isDarkmode ? (
        <img src="/assets/logo.png" className="w-full" alt="clinic" />
      ) : (
        <img src="/assets/logo-b.png" className="w-full" alt="clinic" />
      )}
    </Link>
  );
};

export default Logo;
