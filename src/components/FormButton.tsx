'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loadingText?: string;
  className?: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

const baseStyles =
  'px-6 py-3 font-medium rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2';
const variantStyles = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
  secondary:
    'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-gray-300',
  danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
};

export default function FormButton({
  variant = 'primary',
  text,
  loadingText = '로딩중',
  fullWidth = true,
  className,
  ...rest
}: FormButtonProps) {
  const { pending } = useFormStatus();
  const styleClass = `${baseStyles} ${variantStyles[variant]} ${fullWidth && 'w-full'} ${className}`;

  return (
    <button className={styleClass} {...rest} disabled={pending}>
      {pending ? loadingText : text}
    </button>
  );
}
