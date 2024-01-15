import { style } from '@vanilla-extract/css';
import { background2, text2 } from '@/app/_styles/vars.css';

export const thumbnailInputContainer = style({
  width: '20rem',
  border: 'none',
  outline: 'none',
  boxShadow: 'rgba(0, 0, 0, 0.03) 0px 0px 4px 0px',
  height: '8rem',
  background: background2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const thumbnailInput = style({
  color: text2,
  fontSize: '0.875rem',
});

export const drag = style({});
