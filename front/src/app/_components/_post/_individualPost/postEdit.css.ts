import { style } from '@vanilla-extract/css';
import { text2 } from '@/app/_styles/vars.css';

export const editContainer = style({});

export const editButton = style({
  color: text2,
  border: 'none',
  fontSize: '1rem',
  background: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    opacity: '0.7',
  },
});
