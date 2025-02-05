import Box from '@components/layout/box/Box';

export interface FormFieldProps {
  label?: string;
  labelPlacement?: 'top' | 'left' | 'right';
  required?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
}
export default function FormField({
  label,
  labelPlacement = 'top',
  required = false,
  htmlFor,
  children,
}: FormFieldProps) {
  return (
    <Box
      className="w-full"
      direction={labelPlacement == 'top' ? 'vertical' : 'horizontal'}
      verticalAlign="top"
    >
      {labelPlacement == 'right' && children}

      <label className="w-full text-sm font-medium mb-3 px-1 text-zinc-700" htmlFor={htmlFor}>
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>

      {labelPlacement != 'right' && children}
    </Box>
  );
}
