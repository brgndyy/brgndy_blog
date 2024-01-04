import { style } from '@vanilla-extract/css';
import { text1, background1 } from '@/app/_styles/vars.css';

export const headerContainer = style({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '100',
  width: '70%',
  margin: 'auto',
  height: '80px',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: background1,

  // animation: `${softAppear} 0.3s forwards`,
  // background: background1,
});

export const headerBanner = style({
  color: text1,
  margin: '0 1rem',
});

export const wrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const bannerText = style({});
