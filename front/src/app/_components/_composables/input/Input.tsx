import { InputPropsType } from 'types';

export default function Input({ value, onChange, className, type, placeholder }: InputPropsType) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={className}
      type={type}
      placeholder={placeholder}
    />
  );
}
