import { motion } from 'framer-motion';
import MaxScreenSize from '@components/common/MaxScreenSize.tsx';
import Box from '@components/layout/box/Box.tsx';

interface ProductTitleProps {
  subTitle: string;
  subDescription?: string;
}

const Title = ({ subTitle, subDescription }: ProductTitleProps) => {
  return (
    <MaxScreenSize>
      <Box className="relative w-full h-72 rounded-xl overflow-hidden md:h-96">
        <motion.div
          style={{ backgroundImage: 'url(/assets/images/detail-main01.jpg)' }}
          className={
            'w-full h-full bg-cover bg-center text-white flex items-center justify-center text-center'
          }
          whileInView={{ scale: 1.3 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
      </Box>

      <Box
        direction="vertical"
        verticalAlign="middle"
        className="max-w-screen-md mx-auto py-12 gap-4 text-center border-b border-zinc-200 md:py-20"
      >
        <div className="text-xl font-bold md:text-3xl">{subTitle}</div>
        <div className=" md:text-xl">{subDescription}</div>
      </Box>
    </MaxScreenSize>
  );
};

export default Title;
