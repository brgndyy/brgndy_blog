import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const adminButton = style({
  color: text1,
  margin: '0 1rem',
  fontSize: '1.3rem',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  transition: 'all 0.3s ease',
  ':hover': {
    opacity: '0.8',
    scale: '1.1',
  },
});
