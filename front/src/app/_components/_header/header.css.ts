import { style } from '@vanilla-extract/css';
import { background1 } from '@/app/_styles/vars.css';
import { softAppear } from '@/app/_styles/animation.css';

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
  animation: `${softAppear} 0.3s ease forwards`,
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '100%',
    },
    'screen and (max-width: 768px)': {
      width: '100%',
    },
    'screen and (max-width: 480px)': {
      width: '100%',
    },
  },
});

export const headerLinkContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '1rem',
});

export const wrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});
