import { style } from '@vanilla-extract/css';

export const backdropContainer = style({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.7)',
  zIndex: 500,
});
