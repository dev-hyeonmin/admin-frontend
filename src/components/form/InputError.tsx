interface InputErrorProps {
  message?: string;
}

const InputError = ({message}: InputErrorProps) => {
  return (
    <div className='mt-1 ml-1 text-left text-xs text-red-500'>{message}</div>
  )
}

export default InputError;