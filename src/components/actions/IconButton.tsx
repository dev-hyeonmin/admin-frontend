export interface IconButtonProps {
  className?: string;
  icon: React.ReactNode;
  skin?: 'disabled' | 'primary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const colorVariants: Record<string, string> = {
  primary: '',
  disabled: '',
};

export default function IconButton({
  className,
  icon,
  skin = 'primary',
  type = 'button',
  onClick = () => {},
  disabled = false,
}: IconButtonProps) {
  const style = [colorVariants[skin], className].join(' ');

  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex items-center justify-center ${style}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
