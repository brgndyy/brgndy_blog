import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const titleContainer = style({
  margin: '24px 0 12px',
});

export const postTitle = style({
  maxWidth: '760px',
  color: text1,
  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
  fontWeight: '700',
  lineHeight: '1.2',
  letterSpacing: '-0.045em',
  textAlign: 'left',
  wordBreak: 'keep-all',
});
