interface InputProps {
  type?: string;
  placeholder?: string;
}

const Input = ({ type = 'text', placeholder }: InputProps) => {
  return (
    <input
      className="w-full py-2.5 px-2 text-sm border border-zinc-200 rounded outline-none"
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
