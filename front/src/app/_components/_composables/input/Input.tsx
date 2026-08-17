import { InputPropsType } from 'types';

export default function Input({
  value,
  onChange,
  className,
  type,
  placeholder,
  name,
  autoComplete,
  ariaHidden,
}: InputPropsType) {
  const inputAutoComplete = autoComplete || 'on';

  return (
    <input
      value={value}
      onChange={onChange}
      className={className}
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete={inputAutoComplete}
      aria-hidden={ariaHidden ? 'true' : undefined}
    />
  );
}
