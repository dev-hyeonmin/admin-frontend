export interface CellProps {
  className?: string;
  children?: React.ReactNode;
  span?: number;
  rows?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Cell({
  className = '',
  children,
  span = 12,
  rows = 1,
  style,
  onClick,
}: CellProps) {
  return (
    <div
      className={`${className}`}
      style={{
        gridArea: `span ${rows} / span ${span} / auto / auto`,
        ...style,
      }}
      onClick={onClick}>
      {children}
    </div>
  );
}
