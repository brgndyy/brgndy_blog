import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';
import { fadeIn, fadeOut } from '@/app/_styles/animation.css';

export const modalContainer = style({
  width: '30rem',
  height: '30rem',
  background: '#4a0d0d',
  borderRadius: '1rem',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 20px',
  animation: `0.3s ease-in-out 0s 1 normal forwards running ${fadeIn}`,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export const closeAnimation = style({
  animation: `0.3s ease-in-out 0s 1 normal forwards running ${fadeOut}`,
});

export const closeButton = style({
  position: 'absolute',
  right: '0',
  margin: '1rem',
  background: 'none',
  border: 'none',
  color: text1,
  fontSize: '1.5rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    opacity: '0.7',
  },
});

export const titleContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '1rem 0',
  fontSize: '1.5rem',
  color: text1,
});

export const authForm = style({
  height: '100%',
});

export const inputLabel = style({
  color: text1,
});

export const modalInputContainer = style({
  margin: '1rem 0',
});

export const modalInput = style({
  margin: '0 1rem',
  padding: '0.3rem',
  color: '#000',
});

export const modalButton = style({
  color: text1,
  border: 'none',
  padding: '0.5rem',
  fontSize: '1rem',
  background: '#4a0d0d',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    opacity: '0.7',
  },
});
