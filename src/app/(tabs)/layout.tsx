import Menu from '@/components/menu';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pl-64">
      <Menu />

      <div className="px-6 box-border">{children}</div>
    </div>
  );
}
