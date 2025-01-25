import { Helmet } from 'react-helmet-async';
import { ReactNode } from 'react';
import Box from '@components/layout/box/Box.tsx';

interface ContainerProps {
  title: string;
  prefix?: React.ReactNode;
  children: ReactNode;
}

const Container = ({ title, prefix, children }: ContainerProps) => {
  return (
    <div className="absolute left-72 w-[calc(100%-256px)] py-8 px-16">
      <Helmet>
        <title>Admin | {title}</title>
      </Helmet>

      <Box align="space-between" verticalAlign="middle" className="mb-16">
        <h1 className="font-bold text-2xl text-zinc-800">{title}</h1>
        <div>{prefix}</div>
      </Box>

      {children}
    </div>
  );
};

export default Container;
