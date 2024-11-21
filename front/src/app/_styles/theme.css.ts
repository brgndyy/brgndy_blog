import { createGlobalTheme, style } from '@vanilla-extract/css';

export const lightTheme = createGlobalTheme(':root', {
  colorBackground: 'rgb(15, 17, 21)',
  blockquote: 'rgb(17, 20, 24)',
  blockquoteBorder: 'rgb(23, 26, 30)',
});

export const darkTheme = createGlobalTheme('[data-theme="dark"]', {
  colorBackground: '#202020',
});


export const vintageBackground = style({
  background: `
    linear-gradient(
      rgba(15, 17, 21, 0.97),
      rgba(15, 17, 21, 0.97)
    ),
    url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")
  `,
  backgroundSize: '8px 8px',
});