import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const linkDivContainer = style({});

export const headerLink = style({
  color: text1,
  margin: '0 0.7rem',
  fontSize: '1.75rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    opacity: '0.8',
    scale: '0.7',
  },
});

export const linkIcon = style({
  marginTop: '0.3rem',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '2rem',
    },
    'screen and (max-width: 430px)': {
      fontSize: '1.8rem',
    },
    'screen and (max-width: 420px)': {
      fontSize: '1.8rem',
    },
    'screen and (max-width: 414px)': {
      fontSize: '1.8rem',
    },
    'screen and (max-width: 400px)': {
      fontSize: '1.8rem',
    },
    'screen and (max-width: 390px)': {
      fontSize: '1.8rem',
    },
  },
});

export const headerLinkText = style({
  fontSize: '1.6rem',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '2rem',
    },
    'screen and (max-width: 430px)': {
      fontSize: '1.4rem',
    },
    'screen and (max-width: 420px)': {
      fontSize: '1.4rem',
    },
    'screen and (max-width: 414px)': {
      fontSize: '1.4rem',
    },
    'screen and (max-width: 400px)': {
      fontSize: '1.4rem',
    },
    'screen and (max-width: 390px)': {
      fontSize: '1.4rem',
    },
  },
});
