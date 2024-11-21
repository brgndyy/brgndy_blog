import { createVar, style } from '@vanilla-extract/css';

export const background1 = createVar();
export const background2 = createVar();
export const blockquote = createVar();
export const text1 = createVar();
export const text2 = createVar();
export const text3 = createVar();

export const myStyle = style({
  vars: {
    [background1]: 'rgb(15, 17, 21)',
    [background2]: '#4a0d0d',
    [blockquote]: 'rgb(15, 17, 21)',
    [text1]: '#fff',
    [text2]: '#d9d9d9',
    [text3]: '#acacac',
  },
  selectors: {
    '[data-theme="dark"] &': {
      vars: {
        [background1]: '#1e1e1e',
        [text1]: '#fff',
      },
    },
  },
});
