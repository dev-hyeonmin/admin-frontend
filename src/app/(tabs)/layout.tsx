import Menu from '@/components/menu';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Menu />
      {children}
    </div>
  );
}
