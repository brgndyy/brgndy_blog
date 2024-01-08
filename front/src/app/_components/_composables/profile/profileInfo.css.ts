import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const infoContainer = style({
  color: text1,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const infoText = style({
  fontSize: '1.5rem',
  margin: '0.5rem 0',
});

export const nickName = style({
  fontWeight: 'bold',
});
