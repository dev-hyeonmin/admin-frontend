// import Notification from '@/components/Notification';

import Menu from '@/components/menu';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pl-64">
      <Menu />

      <div className="">
        <div className="relative box-border px-12 pb-32">
          {/* 내용 */}
          {children}
        </div>
      </div>
    </div>
  );
}
