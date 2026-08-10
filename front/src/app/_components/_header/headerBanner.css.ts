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
  margin: '0',
  fontSize: '1rem',
  fontWeight: '700',
  letterSpacing: '-0.02em',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': { fontSize: '1rem' },
  },
});
