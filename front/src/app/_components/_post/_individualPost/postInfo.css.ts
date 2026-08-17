import { style } from '@vanilla-extract/css';
import { text3 } from '@/app/_styles/vars.css';

export const infoContainer = style({
  display: 'flex',
  justifyContent: 'flex-start',
  margin: '20px 0 56px',
  paddingBottom: '24px',
  borderBottom: '1px solid #e5e5e5',
});

export const postDate = style({
  color: text3,
  fontSize: '0.875rem',
});
