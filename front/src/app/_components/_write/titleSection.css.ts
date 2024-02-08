import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const titleContainer = style({
  margin: '1rem 0',
});

export const titleTextArea = style({
  background: 'none',
  fontSize: '2.45rem',
  fontWeight: 'bold',
  color: text1,
  lineHeight: '1.5',
  width: '100%',
  display: 'block',
  resize: 'none',
  border: 'none',
  padding: '0',
});
