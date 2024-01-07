import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const allButtonConatiner = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const buttonContainer = style({});

export const button = style({
  color: text1,
  background: 'none',
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  padding: '1rem',
  ':hover': {
    opacity: '0.7',
  },
});
