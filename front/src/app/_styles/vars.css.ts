import { createVar, style } from '@vanilla-extract/css';

export const background1 = createVar();
export const background2 = createVar();
export const blockquote = createVar();
export const text1 = createVar();
export const text2 = createVar();
export const text3 = createVar();

export const myStyle = style({
  vars: {
    [background1]: '#fbfbfa',
    [background2]: '#4a0d0d',
    [blockquote]: '#f3f3f1',
    [text1]: '#171717',
    [text2]: '#404040',
    [text3]: '#737373',
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
