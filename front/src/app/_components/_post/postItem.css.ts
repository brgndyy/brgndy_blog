import { style } from '@vanilla-extract/css';
import { text1, text3 } from '@/app/_styles/vars.css';

export const itemListContainer = style({
  borderBottom: '1px solid #e5e5e5',
});

export const itemContainer = style({
  display: 'block',
  width: '100%',
  padding: '32px 0',
  transition: 'opacity 0.2s ease',
  ':hover': { opacity: 0.62 },
  '@media': {
    'screen and (max-width: 600px)': { padding: '26px 0' },
  },
});

export const imageContainer = style({});
export const thumbnailImage = style({});

export const infoContainer = style({ width: '100%' });
export const titleContainer = style({});

export const postTitle = style({
  maxWidth: '680px',
  color: text1,
  fontSize: 'clamp(1.2rem, 3vw, 1.45rem)',
  fontWeight: '650',
  lineHeight: '1.45',
  letterSpacing: '-0.025em',
  wordBreak: 'keep-all',
});

export const descriptionContainer = style({ marginTop: '10px' });
export const postDescription = style({
  color: text3,
  fontSize: '0.95rem',
  lineHeight: '1.65',
  wordBreak: 'keep-all',
});

export const dateContainer = style({ marginTop: '14px' });
export const dateText = style({
  color: text3,
  fontSize: '0.78rem',
  fontVariantNumeric: 'tabular-nums',
});
