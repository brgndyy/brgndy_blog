import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const bannerText = style({});

export const banner = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const headerBanner = style({
  color: text1,
  margin: '0 1rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '2rem',
    },
    'screen and (max-width: 430px)': {
      fontSize: '1.6rem',
    },
    'screen and (max-width: 420px)': {
      fontSize: '1.6rem',
    },
    'screen and (max-width: 414px)': {
      fontSize: '1.6rem',
    },
    'screen and (max-width: 400px)': {
      fontSize: '1.6rem',
    },
    'screen and (max-width: 390px)': {
      fontSize: '1.6rem',
    },
  },
});
