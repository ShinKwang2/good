import { InputHTMLAttributes, Ref, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(function Input(
  { type, className, ...props }: Props,
  ref: Ref<HTMLInputElement>
) {
  return <input type={type} className={className} ref={ref} {...props} />;
});

export default Input;
