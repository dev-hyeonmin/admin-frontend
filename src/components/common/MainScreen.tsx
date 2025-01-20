import { motion } from 'framer-motion';

interface MainScreenProps {
  title: string;
  img: string;
}

const fadeDownVariants = {
  initial: { y: -50, opacity: 0.1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

const MainScreen = ({ title, img }: MainScreenProps) => {
  return (
    <div className="relative h-[600px]">
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-center text-center text-white"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />
        <motion.div
          className="absolute text-2xl leading-normal md:text-5xl"
          variants={fadeDownVariants}
          initial={'initial'}
          whileInView={'visible'}
        >
          <div className="font-bold">{title}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainScreen;
