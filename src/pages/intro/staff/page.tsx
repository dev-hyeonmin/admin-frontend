import IntroHeader from '@/pages/intro/components/IntroHeader.tsx';
import Box from '@components/layout/box/Box.tsx';
import { motion } from 'framer-motion';
import { doctors, staffs } from '@/pages/intro/staff/data.ts';
import { Helmet } from 'react-helmet-async';

const Staff = () => {
  return (
    <div>
      <Helmet>
        <title>센텀스타의원 | 의료진 소개</title>
      </Helmet>

      <IntroHeader />
      <StaffMain />
      <StaffList title="의사" staffList={doctors} />

      {staffs.length > 0 && <StaffList title="스탭" className="mt-16" staffList={staffs} />}
    </div>
  );
};

export default Staff;

/**
 * components
 */

const StaffMain = () => {
  return (
    <Box direction="vertical" align="center" verticalAlign="middle" className="w-full px-4">
      <Box className="relative w-full h-72 rounded-xl overflow-hidden max-w-screen-xl md:h-96">
        <motion.div
          style={{ backgroundImage: 'url(/assets/images/staff-main.jpg)' }}
          className={'w-full h-full bg-cover bg-center'}
          whileInView={{ scale: 1.1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        ></motion.div>
      </Box>

      <motion.div
        className="mt-16 px-4 text-center md:mt-28 md:px-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-xl md:text-3xl">
          끊임없이 연구하는
          <span className="font-bold"> 의료진</span>
        </div>

        <div className="mt-8 leading-relaxed text-center text-zinc-500 text-sm md:text-base">
          언제나 고객님의 피부파트너 클리닉 피부과입니다.
          <span className="md:block">
            풍부한 경험과 노하우, 세심하고 정밀한 맞춤시술로 특별한 아름다움을 선사합니다.
          </span>
        </div>
      </motion.div>

      <div className="hidden pt-16 pb-0 text-xl font-light text-center text-zinc-400 md:block">
        . <br />
        . <br />
        . <br />
      </div>
    </Box>
  );
};

interface StaffListProps {
  title: string;
  className?: string;
  staffList: StaffImageProps[];
}

const StaffList = ({ title, staffList, className }: StaffListProps) => {
  return (
    <Box direction="vertical" className={`mt-20 px-4 w-full max-w-screen-xl mx-auto ${className}`}>
      <div className="pb-4 px-2 w-full text-xl font-bold border-b border-zinc-200">{title}</div>

      <Box className="mt-4 w-full gap-4 flex-wrap">
        {staffList.map((staff, index) => (
          <StaffImage
            key={`staff${index}`}
            position={staff.position}
            name={staff.name}
            img={staff.img}
          />
        ))}
      </Box>
    </Box>
  );
};

interface StaffImageProps {
  position: string;
  name: string;
  img: string;
}

const StaffImage = ({ position, name, img }: StaffImageProps) => {
  return (
    <div className="mb-8 w-[calc(50%-8px)] text-center md:w-[calc(25%-12px)]">
      <div
        className="w-full h-52 bg-zinc-200 rounded-lg bg-cover md:h-72"
        style={{ backgroundImage: `url('${img}')` }}
      ></div>
      <div className="mt-4 text-sm text-zinc-500 md:text-base">{position}</div>
      <div className="mt-1 font-bold md:text-xl md:mt-2">{name}</div>
    </div>
  );
};
