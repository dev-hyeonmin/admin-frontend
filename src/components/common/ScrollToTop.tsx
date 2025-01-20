import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/category/')) {
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
