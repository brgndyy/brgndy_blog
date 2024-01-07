import React from 'react';
import { ButtonPropsType } from 'types';

export default function Button({ type = 'button', text, onClick, className }: ButtonPropsType) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {text}
    </button>
  );
}
