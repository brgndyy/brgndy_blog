import { style } from '@vanilla-extract/css';
import { text3 } from '@/app/_styles/vars.css';

export const infoContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '1rem 0',
});

export const postDate = style({
  color: text3,
  fontSize: '1.2rem',
});
