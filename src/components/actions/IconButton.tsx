export interface IconButtonProps {
  className?: string;
  icon: React.ReactNode;
  skin?: 'default' | 'primary' | 'danger' | 'disabled';
  priority?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const colorVariants: Record<string, any> = {
  default: {
    primary: '',
    secondary: '',
  },
  danger: {
    primary: 'border-red-300 bg-red-500',
    secondary: 'border-red-300',
  },
};

export default function IconButton({
  className,
  icon,
  skin = 'default',
  priority = 'secondary',
  type = 'button',
  onClick = () => {},
  disabled = false,
}: IconButtonProps) {
  const style = [colorVariants[skin][priority], className].join(' ');

  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex items-center justify-center size-9 border rounded-full ${style}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
