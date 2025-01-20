import Box from '@components/layout/box/Box.tsx';
import { useState } from 'react';
import { getCookie, setCookie } from '@/hooks/useCookie.ts';

interface PopupProps {
  id: number;
  img: string;
}

const Popup = ({ id, img }: PopupProps) => {
  const popupCookie = getCookie(`popup-${id}`) !== 'Y';
  const [isActive, setIsActive] = useState(popupCookie);

  const onCloseDuringDay = () => {
    setCookie(`popup-${id}`, 'Y', 1);
    onClose();
  };

  const onClose = () => {
    setIsActive(() => false);
  };

  if (!isActive) {
    return null;
  }

  return (
    <Box align="center" verticalAlign="middle" className="fixed w-full h-full z-20">
      <div className="absolute overflow-hidden rounded-xl max-md:bottom-0">
        <img src={img} alt="팝업" className="w-full md:w-[500px]" />

        <Box align="center" verticalAlign="middle" className="bg-black text-white">
          <button
            className="flex-1 py-5 relative text-sm md:py-6 md:text-base
            after:absolute after:-right-0.5 after:content-[''] after:w-0.5 after:h-7 after:border-r after:border-white after:opacity-60 md:after:h-4"
            onClick={onCloseDuringDay}
          >
            다시 보지 않기
          </button>
          <button className="flex-1 py-5 text-sm md:py-6 md:text-base" onClick={onClose}>
            닫기
          </button>
        </Box>
      </div>
    </Box>
  );
};

export default Popup;
