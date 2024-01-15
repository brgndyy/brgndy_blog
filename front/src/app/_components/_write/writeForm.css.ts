import { style } from '@vanilla-extract/css';

export const thumbnailAndDescriptionContainer = style({});

export const totalSubmitFormContainer = style({
  position: 'fixed',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000',
  background: '#4a0d0d',
  width: '100vw',
  height: '100vh',
});
