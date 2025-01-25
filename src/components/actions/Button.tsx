export interface ButtonProps {
  className?: string;
  label: string;
  type?: 'button' | 'submit';
  size?: 'tiny' | 'small' | 'medium' | 'large';
  skin?: 'default' | 'primary';
  priority?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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

  return (
    <button
      type={type}
      className={`border border-zinc-200 rounded text-sm ${style}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
