import { style } from '@vanilla-extract/css';

export const allPostContainer = style({
  width: '100%',
  maxWidth: '760px',
  margin: '0 auto',
});

export const intro = style({
  padding: '24px 0 56px',
  borderBottom: '1px solid #e5e5e5',
});

export const introTitle = style({
  maxWidth: '640px',
  margin: 0,
  color: '#171717',
  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
  fontWeight: '700',
  lineHeight: '1.22',
  letterSpacing: '-0.045em',
  wordBreak: 'keep-all',
});

export const introDescription = style({
  marginTop: '20px',
  color: '#737373',
  fontSize: '1rem',
  lineHeight: '1.7',
  wordBreak: 'keep-all',
});
