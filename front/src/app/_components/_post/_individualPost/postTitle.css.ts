import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const titleContainer = style({
  margin: '2rem 0',
});

export const postTitle = style({
  color: text1,
  fontSize: '3rem',
  textAlign: 'center',
});
