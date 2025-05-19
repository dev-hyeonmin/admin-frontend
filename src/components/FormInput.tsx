import React, { InputHTMLAttributes } from 'react';
import { TriangleAlert } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  name: string;
  type?: string;
  required?: boolean;
  errors?: string[];
}

export default function FormInput({
  className,
  wrapperClassName,
  name,
  type = 'text',
  required = false,
  errors = [],
  ...rest
}: FormInputProps) {
  return (
    <div className={wrapperClassName}>
      <input
        className={`w-full rounded-lg border border-gray-200 p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className || ''}`}
        type={type}
        name={name}
        placeholder={rest.placeholder}
        required={required}
        {...rest}
      />

      {errors.map((error, index) => (
        <span
          key={index}
          className="mt-1 flex items-center gap-1 pl-0.5 text-sm font-medium text-red-500"
        >
          <TriangleAlert size={14} /> {error}
        </span>
      ))}
    </div>
  );
}
