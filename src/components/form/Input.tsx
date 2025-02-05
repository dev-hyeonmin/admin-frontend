import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import InputError from '@components/form/InputError.tsx';

interface InputProps {
  name: string;
  options?: (RegisterOptions<FieldValues, string> | undefined);
  type?: string;
  placeholder?: string;
}

const Input = ({ name, options, type = 'text', placeholder }: InputProps) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <>
      <input
        {...register(name, options)}
        className="w-full py-2.5 px-2 text-sm border border-zinc-200 rounded outline-none"
        type={type}
        placeholder={placeholder}
      />
      {error && <InputError message={String(error.message)} />}
    </>
  );
};

export default Input;
