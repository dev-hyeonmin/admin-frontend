import { Helmet } from 'react-helmet-async';
import { ReactNode } from 'react';
import Box from '@components/layout/box/Box.tsx';
import { useNavigate } from 'react-router';
import { IoArrowBack } from 'react-icons/io5';

interface ContainerProps {
  title: string;
  suffix?: React.ReactNode;
  useBackNav?: boolean;
  children: ReactNode;
}

const Container = ({ title, suffix, useBackNav = false, children }: ContainerProps) => {
  let navigate = useNavigate();

  return (
    <div className="absolute left-64 w-[calc(100%-256px)]">
      <Helmet>
        <title>Admin | {title}</title>
      </Helmet>

      <Box
        align="space-between"
        verticalAlign="middle"
        className="border-b border-zinc-200 py-4 px-8"
      >
        <Box verticalAlign="middle" className="gap-4">
          {useBackNav && (
            <button
              type="button"
              className="flex justify-center items-center py-2.5 px-4 bg-zinc-100 rounded-full"
              onClick={() => navigate(-1)}
            >
              <IoArrowBack className="text-zinc-600" />
            </button>
          )}
          <h1 className="font-bold text-xl text-zinc-700">{title}</h1>
        </Box>
        {suffix}
      </Box>

      {children}
    </div>
  );
};

export default Container;
