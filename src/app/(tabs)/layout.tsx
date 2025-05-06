import Menu from '@/components/menu';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pl-64">
      <Menu />

      <div className="box-border px-6">{children}</div>
    </div>
  );
}
