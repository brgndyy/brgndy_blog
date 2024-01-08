import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const titleContainer = style({
  padding: '1rem',
});

export const titleInput = style({
  background: 'none',
  fontSize: '2.75rem',
  fontWeight: 'bold',
  color: text1,
  lineHeight: '1.5',
  width: '100%',
  display: 'block',
  resize: 'none',
  border: 'none',
});
