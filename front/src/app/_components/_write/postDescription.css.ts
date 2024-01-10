import { style } from '@vanilla-extract/css';
import { text2, background2 } from '@/app/_styles/vars.css';

export const descriptionContainer = style({});

export const descriptionTextArea = style({
  resize: 'none',
  width: '20rem',
  border: 'none',
  outline: 'none',
  boxShadow: 'rgba(0, 0, 0, 0.03) 0px 0px 4px 0px',
  color: text2,
  background: background2,
  lineHeight: '1.5',
  fontSize: '0.875rem',
  height: '8rem',
  padding: '1rem',
  marginTop: '0.5rem',
});
