import {useEffect, useState} from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );
      setIsMobile(mobile || ('ontouchstart' in window || window.innerWidth <= 768));
    };

    checkIsMobile();
  }, []);

  return isMobile;
};