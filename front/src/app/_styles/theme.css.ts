import { createGlobalTheme } from '@vanilla-extract/css';

export const lightTheme = createGlobalTheme(':root', {
  colorBackground: '#fbfbfa',
  blockquote: '#f3f3f1',
  blockquoteBorder: '#1d4ed8',
});

export const darkTheme = createGlobalTheme('[data-theme="dark"]', {
  colorBackground: '#202020',
});
