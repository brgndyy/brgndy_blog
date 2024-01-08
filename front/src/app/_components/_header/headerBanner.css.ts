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
});
