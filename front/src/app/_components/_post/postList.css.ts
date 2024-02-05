import { style } from '@vanilla-extract/css';

export const postList = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem',
  width: '70%',
  '@media': {
    'screen and (max-width: 1520px)': {
      width: '100%',
    },
  },
});
