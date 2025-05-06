export default function SiteWidth({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <div className={`max-w-screen-xl mx-auto px-4 ${className}`}>{children}</div>;
}
