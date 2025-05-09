import React, { InputHTMLAttributes } from 'react';

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
        className={`w-full rounded-lg border border-gray-200 p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none ${className || ''}`}
        type={type}
        name={name}
        placeholder={rest.placeholder}
        required={required}
        {...rest}
      />

      {errors.map((error, index) => (
        <span key={index} className="font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
