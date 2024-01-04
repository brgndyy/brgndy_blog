import { createGlobalTheme } from '@vanilla-extract/css';

export const lightTheme = createGlobalTheme(':root', {
  colorBackground: '#511717',
});

export const darkTheme = createGlobalTheme('[data-theme="dark"]', {
  colorBackground: '#202020',
});
