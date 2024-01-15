import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';
import { fadeIn, fadeOut } from '@/app/_styles/animation.css';

export const modalContainer = style({
  width: '30rem',
  height: '10rem',
  background: '#4a0d0d',
  borderRadius: '1rem',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 20px',
  animation: `0.3s ease-in-out 0s 1 normal forwards running ${fadeIn}`,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const closeModalAnimation = style({
  animation: `0.3s ease-in-out 0s 1 normal forwards running ${fadeOut}`,
});

export const modalText = style({
  color: text1,
});

export const deleteButton = style({
  background: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: text1,
  border: 'none',
  padding: '0.5rem',
  margin: '1rem 0',
  fontSize: '1.3rem',
  ':hover': {
    opacity: '0.7',
  },
});
