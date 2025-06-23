import React, { InputHTMLAttributes, useState } from 'react';
import { TriangleAlert } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  errors?: string[];
}

export default function FormInput({
  label,
  name,
  type = 'text',
  required = false,
  errors = [],
  className,
  ...rest
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {/* Input */}
      <input
        className={`w-full rounded-xl border bg-white px-4 py-3.5 text-[15px] text-gray-900 transition-all duration-200 ease-in-out placeholder:text-gray-400 ${isFocused ? 'border-blue-500 shadow-[0_0_0_3px_rgba(0,122,255,0.1)]' : 'border-gray-200'} ${errors.length > 0 ? 'border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : ''} focus:outline-none ${className || ''} `}
        type={type}
        name={name}
        placeholder={rest.placeholder}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />

      {/* Error */}
      {errors.map((error, index) => (
        <span
          key={index}
          className="mt-1.5 flex items-center gap-1.5 pl-0.5 text-[13px] font-medium text-red-500"
        >
          <TriangleAlert size={14} /> {error}
        </span>
      ))}
    </div>
  );
}
