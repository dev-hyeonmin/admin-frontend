interface MaxScreenSize {
  children?: React.ReactNode;
  className?: string;
}

const MaxScreenSize = ({ children, className }: MaxScreenSize) => {
  return <div className={`px-4 max-w-screen-xl mx-auto ${className}`}>{children}</div>;
};

export default MaxScreenSize;
