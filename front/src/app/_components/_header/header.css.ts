import { style } from '@vanilla-extract/css';

export const headerContainer = style({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '100',
  width: '70%',
  margin: 'auto',
  height: '80px',
  boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  // animation: `${softAppear} 0.3s forwards`,
  // background: background1,
});
