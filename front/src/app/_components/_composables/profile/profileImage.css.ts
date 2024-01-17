import { style } from '@vanilla-extract/css';

export const profileImageContainer = style({
  margin: '0 3rem',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '2rem',
    },
  },
});

export const profileImage = style({
  borderRadius: '50%',
});
