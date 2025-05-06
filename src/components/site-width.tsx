export default function SiteWidth({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <div className={`mx-auto max-w-screen-xl px-4 ${className}`}>{children}</div>;
}
