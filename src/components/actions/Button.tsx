export interface ButtonProps {
  className?: string;
  label: string;
  type?: 'button' | 'submit';
  size?: 'tiny' | 'small' | 'medium' | 'large';
  skin?: 'default' | 'primary';
  priority?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: (...args: any[]) => void;
}

const skinVariants: Record<string, any> = {
  primary: {
    primary: '',
    secondary: '',
  },
  default: {
    primary: '',
    secondary: '',
  },
};

const sizeVariants: Record<string, string> = {
  tiny: '',
  small: '',
  medium: '',
  large: '',
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
      className={`border border-zinc-200 rounded-full font-bold text-sm pt-1.5 pb-2 px-3.5 ${style}`}
      onClick={(e) => buttonOnClick(e)}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
