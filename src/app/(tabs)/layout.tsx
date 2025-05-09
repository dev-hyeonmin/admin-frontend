import Menu from '@/components/menu';
import Notification from '@/components/Notification';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pl-64">
      <Menu />

      <div className="">
        {/* 공지사항 */}
        <Notification />

        <div className="box-border px-12">
          {/* 내용 */}
          {children}
        </div>
      </div>
    </div>
  );
}
