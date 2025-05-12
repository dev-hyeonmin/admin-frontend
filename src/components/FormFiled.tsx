import { LabelHTMLAttributes } from 'react';

interface FormFieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}
export default function FormField({
  className,
  children,
  label,
  required,
  ...rest
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={rest.htmlFor} className="mb-4 block text-sm font-medium">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
