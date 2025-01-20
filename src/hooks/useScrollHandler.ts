import { useState, useEffect, useTransition } from "react";

export const useScrollHandler = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isHeaderTop, setIsHeaderTop] = useState(true); // 추가 상태

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      startTransition(() => {
        setScrollY(currentScrollY);

        // scrollY > 100 상태 변경을 처리
        setIsHeaderTop(currentScrollY < 100);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollY, isHeaderTop, isPending };
};
