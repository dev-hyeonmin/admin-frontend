import { BrowserRouter, Route, Routes } from 'react-router';
import React, { Suspense } from 'react';
import Header from '@components/Header.tsx';
import Footer from '@components/Footer.tsx';
import ScrollToTop from '@components/common/ScrollToTop.tsx';
import Main from '@/pages/main/page.tsx';

export const Router = () => {
  const routes: { path: string; Element: React.ComponentType }[] = [];

  // dynamic import to enable lazy loading for pages
  const modules: any = import.meta.glob('/src/pages/**/page.tsx', {
    eager: false,  // Change eager to false to enable lazy loading
  });

  for (const path of Object.keys(modules)) {
    const fileName = path.match(/pages\/(?!.*?\(.*?\)\/)(.*)\/page\.tsx/)?.[1];

    if (!fileName) {
      continue;
    }

    const normalizedPathName = fileName.replace(/\[(.*?)\]/, ':$1');

    // Use React.lazy to load each page only when it's needed
    routes.push({
      path: `/${normalizedPathName}`,
      Element: React.lazy(() => modules[path]()),
    });
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Main />} />

          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.Element />} />
          ))}

          <Route path="*" element={<Main />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
};
