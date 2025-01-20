// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/scrollbar';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import Box from '@components/layout/box/Box.tsx';
import { motion } from 'framer-motion';
import { popups, slides } from './data';
import GoogleMap from '@components/common/Map';
import { useIsMobile } from '@/hooks/useIsMobile.ts';
import Popup from '@components/common/Popup.tsx';
import { Helmet } from 'react-helmet-async';

/**
 * motion variants
 */
const fadeUpVariants = {
  initial: { y: 50, opacity: 0.1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

const bounceVariants = {
  up: { y: -5 },
  down: { y: 5 },
};

const Main = () => {
  return (
    <div>
      <Helmet>
        <title>센텀스타의원</title>
      </Helmet>

      <MainScreen />
      <RecommendedProducts />
      <Introduction />
      <Contact />
    </div>
  );
};

export default Main;

/**
 * Components
 */
const MainScreen = () => {
  return (
    <div className="relative h-[650px] md:h-screen">
      <div
        style={{ backgroundImage: 'url(/assets/images/main.jpg)' }}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-center text-center text-white"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65" />

        <motion.div
          className="absolute text-3xl md:text-5xl"
          variants={fadeUpVariants}
          initial="initial"
          whileInView="visible"
        >
          <div className="font-light">꼼꼼한 시술은</div>
          <div className="mt-2 font-bold md:mt-4">센텀스타</div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 text-white font-light opacity-50 cursor-default ㅠㅎ-"
          variants={bounceVariants}
          initial={'up'}
          animate={'down'}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <div className="absolute -top-4 w-full text-center">scroll</div>
          <img src={'/assets/icon/icon-scroll.png'} alt="scroll" className="w-14" />
        </motion.div>
      </div>

      {popups.map((popup) => (
        <Popup key={`popup${popup.id}`} {...popup} />
      ))}
    </div>
  );
};

const RecommendedProducts = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative mt-16 mb-8 px-4 max-w-screen-xl mx-auto md:my-36">
      <motion.div
        variants={fadeUpVariants}
        initial="initial"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Box
          align="space-between"
          verticalAlign="top"
          className="flex-col gap-4 md:flex-row md:gap-0"
        >
          <div className="text-xl font-bold md:text-2xl">CINICAL FACIAL</div>
          <div className="text-zinc-600 leading-relaxed text-sm md:text-right md:text-black md:text-base md:leading-8">
            <span className="md:block">
              시간의 흐름에 따른 피부의 변화를 원래의 바른 모습으로 되돌리기 위해 노력합니다.
            </span>
            자연스러운 변화를 만들어 여러분에게 행복을 드리겠습니다.
          </div>
        </Box>
      </motion.div>

      <Swiper
        className="mt-8 md:mt-16"
        modules={[Navigation, Scrollbar]}
        spaceBetween={isMobile ? 16 : 32}
        slidesPerView={isMobile ? 1 : 4}
        navigation
        scrollbar
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`slide${index}`}>
            <Slide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      <a
        href="/category"
        className="absolute bottom-8 right-4 pl-4 pr-2 text-zinc-700 text-xs shadow-lg rounded-full z-10 md:bottom-5 md:text-sm"
      >
        <Box verticalAlign="middle" className="h-8 gap-1 md:h-10">
          <span>시술안내 바로가기</span>
          <img src="/assets/icon/icon-next.png" alt="next" className="size-6 p-1" />
        </Box>
      </a>
    </div>
  );
};

export interface SlideProps {
  imgUrl: string;
  title: string;
  description: string;
}

const Slide = ({ imgUrl, title }: SlideProps) => {
  return (
    <a href="#">
      <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className="relative w-full h-80 bg-cover bg-center rounded-2xl"
      >
        <div className="absolute top-4 right-4 size-4">
          <img src="/assets/icon/icon-link.png" alt="link" className="" />
        </div>

        <div className="absolute bottom-4 left-4 text-white">{title}</div>
      </div>
    </a>
  );
};

const Introduction = () => {
  return (
    <div className="relative px-4 max-w-screen-xl mx-auto">
      <Box direction="horizontal" className="flex-col gap-4 md:flex-row md:gap-20">
        <motion.div
          variants={fadeUpVariants}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-xl font-bold leading-relaxed md:text-2xl">
            아름다움 그리고, 함께 행복을 <br />
            느끼실 수 있는 공간 <br />
          </div>
        </motion.div>

        <motion.div
          className="text-zinc-600 leading-relaxed text-sm md:text-black md:text-base md:leading-8"
          variants={fadeUpVariants}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="md:block">
            센텀스타의원은 단순히 시술을 받는 곳이 아닌, 편안하고 따뜻한 공간에서{' '}
          </span>
          <span className="md:block">
            몸과 마음의 아름다움을 찾아가는 시간을 가질 수 있도록 병원 환경 조성에 특별히
            힘썼습니다.{' '}
          </span>
          <span className="md:block">
            세심하게 디자인된 진료실과 대기실은 고객들이 마치 집에 있는 듯한{' '}
          </span>
          <span className="md:block">편안함을 느낄 수 있도록 하였으며, 방문하는 순간부터 </span>
          안락함과 안정감을 느끼실 수 있도록 최선을 다하고 있습니다.
        </motion.div>
      </Box>

      <div
        style={{ backgroundImage: 'url(/assets/images/main-sub.jpg)' }}
        className="w-full h-96 bg-cover bg-center rounded-2xl mt-8 md:bg-[center_bottom_-3rem] md:mt-16 md:rounded-xl"
      ></div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="py-16 px-4 max-w-screen-xl mx-auto md:py-36">
      <Box
        direction="horizontal"
        align="space-between"
        className="flex-col items-start gap-8 md:flex-row md:items-end md:gap-10"
      >
        <div>
          <div className="text-xl font-bold md:text-2xl">Contact</div>

          <div className="mt-8 text-sm md:text-lg">
            부산 해운대구 센텀2로 20 <br />
            센텀타워메디컬 5층
          </div>

          <div className="mt-4 text-xs leading-relaxed md:leading-8 md:text-base">
            ■ 센텀시티역 11번출구 도보 2분 <br />■ 지하주차장 이용가능
          </div>
        </div>

        <Box direction="vertical" className="gap-1 text-sm md:gap-2 md:text-base">
          <Box>
            <div className="w-20">월요일</div>
            <div>오전 10:00 ~ 오후 09:00</div>
          </Box>
          <Box>
            <div className="w-20">목요일</div>
            <div>오후 02:00 ~ 오후 07:00</div>
          </Box>
          <Box>
            <div className="w-20">화·수·금</div>
            <div>오전 10:00 ~ 오후 07:00</div>
          </Box>
          <Box>
            <div className="w-20">토요일</div>
            <div>오전 10:00 ~ 오후 03:00</div>
          </Box>
          <Box>
            <div className="w-20">점심시간</div>
            <div>오후 01:00 ~ 오후 02:00</div>
          </Box>
        </Box>
      </Box>

      <GoogleMap className="mt-10 w-full rounded-xl" />
    </div>
  );
};
