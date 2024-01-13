import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';
import { fadeIn, fadeOut } from '@/app/_styles/animation.css';

export const modalContainer = style({
  width: '30rem',
  height: '30rem',
  background: '#4a0d0d',
  borderRadius: '1rem',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 20px',
  color: text1,
  animation: `0.3s ease-in-out 0s 1 normal forwards running ${fadeIn}`,
});

export const closeAnimation = style({
  animation: `0.3s ease-in-out 0s 1 normal forwards running ${fadeOut}`,
});
