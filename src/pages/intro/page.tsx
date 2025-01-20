import Box from '@components/layout/box/Box.tsx';
import { motion } from 'framer-motion';
import IntroHeader from '@/pages/intro/components/IntroHeader.tsx';
import GoogleMap from '@components/common/Map.tsx';
import { Helmet } from 'react-helmet-async';

const Intro = () => {
  return (
    <div>
      <Helmet>
        <title>센텀스타의원 | 병원소개</title>
      </Helmet>

      <IntroHeader />
      <Intro01 />
      <Intro02 />
      <IntroContact />
    </div>
  );
};

export default Intro;

/**
 * Component
 */

const Intro01 = () => {
  return (
    <Box direction="vertical" align="center" verticalAlign="middle" className="w-full px-4">
      <Box className="relative w-full h-72 rounded-xl overflow-hidden max-w-screen-xl md:h-96">
        <motion.div
          style={{ backgroundImage: 'url(/assets/images/intro-main.jpg)' }}
          className={'w-full h-full bg-cover bg-center'}
          whileInView={{ scale: 1.1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        ></motion.div>
      </Box>

      <motion.div
        className="mt-16 px-4 text-center md:mt-28 md:px-0 max-w-screen-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-xl md:text-3xl">
          몸과 마음의 아름다움을{' '}
          <span className="font-bold block md:inline-block"> 찾아가는 시간</span>
        </div>

        <div className="mt-8 leading-relaxed text-center text-zinc-500 text-sm md:text-xl md:font-light">
          시간의 흐름에 따른 주름, 피부결, 윤곽의 변화를 원래의 바른 모습으로 되돌리기 위해
          노력합니다.
          <span className="md:block">
            {' '}
            1:1 맞춤 상담을 통해 자연스러운 변화를 만들어 여러분에게 행복을 드리겠습니다.
          </span>
        </div>
      </motion.div>
    </Box>
  );
};

const Intro02 = () => {
  return (
    <div>
      <div>
        <Box direction="vertical" align="center" verticalAlign="middle" className="pt-16 md:pt-28">
          <Box direction="horizontal">
            <img src="/assets/images/intro-sub01.jpg" alt="intro" className="w-1/2" />
            <img src="/assets/images/intro-sub02.jpg" alt="intro" className="w-1/2" />
          </Box>
        </Box>
      </div>

      <div className="py-16 px-4 text-right bg-zinc-100 md:py-44">
        <Box direction="vertical" verticalAlign="bottom" className="mx-auto max-w-screen-xl gap-8">
          <div className="text-xl md:text-3xl">
            1:1 맞춤 상담을 통한{' '}
            <span className="block font-bold md:inline-block">자연스러운 변화</span>
          </div>

          <div className="leading-relaxed text-sm md:text-xl md:font-light">
            정확한 진단과 각 개인의 피부 타입 및 고민에 최적화된 치료를 제공하기 위해
            <span className="md:block">
              {' '}
              고객 한 분 한 분과의 1:1 맞춤 상담을 기본 원칙으로 하고 있습니다. <br/> 이를 통해 더욱 신뢰할 수 있는 맞춤형 솔루션을 제안드리고자 합니다.
            </span>
          </div>
        </Box>
      </div>
    </div>
  );
};

const IntroContact = () => {
  return (
    <Box
      align="space-between"
      verticalAlign="middle"
      className="flex-col py-16 px-4 gap-8 mx-auto max-w-screen-xl md:flex-row md:py-28 md:gap-0"
    >
      <Box className="w-full gap-10 md:w-auto md:mt-4" direction="vertical">
        <div className="text-xl font-bold md:text-3xl">Contact</div>

        <div>
          <div className="text-sm md:text-lg">
            부산 해운대구 센텀2로 20 <br />
            센텀타워메디컬 5층
          </div>

          <div className="text-xs mt-4 leading-relaxed md:text-base md:leading-8">
            ■ 센텀시티역 11번출구 도보 2분 <br />■ 지하주차장 이용가능
          </div>
        </div>

        <Box direction="vertical" className="text-sm gap-1 md:text-base md:gap-2">
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

      <GoogleMap className="w-full rounded-xl md:w-8/12" />
    </Box>
  );
};
