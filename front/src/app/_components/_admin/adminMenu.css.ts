import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const menuContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '10rem',
  height: '10rem',
  marginRight: '1rem',
  background: '#581717',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 20px',
  padding: '1rem',
});

export const menuItem = style({
  color: text1,
});
