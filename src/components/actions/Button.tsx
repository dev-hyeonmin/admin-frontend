export interface ButtonProps {
  className?: string;
  label: string;
  type?: 'button' | 'submit';
  size?: 'tiny' | 'small' | 'medium' | 'large';
  skin?: 'default' | 'primary' | 'danger';
  priority?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: (...args: any[]) => void;
}

const skinVariants: Record<string, any> = {
  danger: {
    primary: 'border-red-500 bg-red-500 text-white',
    secondary: 'border-red-500 text-white',
  },
  default: {
    primary: 'border-0 bg-blue-600 text-white',
    secondary: 'border-zinc-200',
  },
};

const sizeVariants: Record<string, string> = {
  tiny: '',
  small: '',
  medium: 'pt-1.5 pb-2 px-3.5 text-sm',
  large: 'pt-2 pb-2.5 px-7 text-sm',
};

export default function Button({
  className,
  label,
  type = 'button',
  size = 'medium',
  skin = 'default',
  priority = 'secondary',
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  const style = [skinVariants[skin][priority], sizeVariants[size], className].join(' ');
  const buttonOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick && onClick();
  };

  return (
    <button
      type={type}
      className={`border rounded-lg ${style}`}
      onClick={(e) => buttonOnClick(e)}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
