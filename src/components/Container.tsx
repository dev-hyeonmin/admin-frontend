import { Helmet } from 'react-helmet-async';
import { ReactNode } from 'react';

interface ContainerProps {
  title: string;
  children: ReactNode;
}

const Container = ({ title, children }: ContainerProps) => {
  return (
    <div className="absolute left-72 w-full py-8 px-16">
      <Helmet>
        <title>Admin | {title}</title>
      </Helmet>

      <h1 className="mb-16 font-bold text-3xl text-zinc-800">{title}</h1>

      {children}
    </div>
  );
};

export default Container;
