import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const infoContainer = style({
  width: '100%',
  color: text1,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: 'auto 3.5rem',
});

export const infoText = style({
  fontSize: '1.5rem',
  margin: '1rem 0',
});

export const nickName = style({
  fontWeight: 'bold',
});
