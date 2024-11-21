import { createGlobalTheme, style } from '@vanilla-extract/css';

export const lightTheme = createGlobalTheme(':root', {
  colorBackground: 'rgb(15, 17, 21)',
  blockquote: 'rgb(17, 20, 24)',
  blockquoteBorder: 'rgb(23, 26, 30)',
});

export const darkTheme = createGlobalTheme('[data-theme="dark"]', {
  colorBackground: '#202020',
});

