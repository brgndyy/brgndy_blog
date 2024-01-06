import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const linkDivContainer = style({
  marginTop: '0.3rem',
});

export const headerLink = style({
  color: text1,
  margin: '0 1rem',
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
});

export const headerLinkText = style({
  fontSize: '1.5rem',
});
