import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  errors?: string[];
}

const FormInput: React.FC<FormInputProps> = ({
  className,
  wrapperClassName,
  type,
  placeholder,
  required = false,
  errors = [],
  ...rest
}) => {
  return (
    <div className={wrapperClassName}>
      <input
        className={`w-full p-4 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
        type={type}
        placeholder={placeholder}
        required={required}
        {...rest}
      />

      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default FormInput;
