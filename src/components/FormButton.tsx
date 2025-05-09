'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  text: string;
}

export default function FormButton({
  variant = 'primary',
  fullWidth = true,
  text,
  className,
  ...rest
}: FormButtonProps) {
  const { pending } = useFormStatus();
  const baseStyles =
    'p-4 font-medium rounded-lg transition-colors cursor-pointer focus:outline-none';
  const variantStyles = {
    primary: 'bg-blue-700 hover:bg-blue-600 text-white',
    secondary: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
    danger: 'bg-red-700 hover:bg-red-600 text-white',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className || ''}`;

  return (
    <button className={combinedClassName} {...rest} disabled={pending}>
      {pending ? '로딩중' : text}
    </button>
  );
}
