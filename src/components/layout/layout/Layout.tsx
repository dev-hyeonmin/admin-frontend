export interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Layout({className, children}: LayoutProps) {
  return (
    <div className={`grid w-full grid-cols-12 auto-rows-auto ${className}`}>
      {children}
    </div>
  );
}
