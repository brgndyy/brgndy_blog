import { style } from '@vanilla-extract/css';

export const card = style({
  width: '50vw',
  height: '100vh',
  margin: '0 auto',
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '90vw',
    },
    'screen and (max-width: 820px)': {
      width: '80vw',
    },
    'screen and (max-width: 768px)': {
      width: '80vw',
    },
    'screen and (max-width: 480px)': {
      width: '80vw',
    },
  },
});
