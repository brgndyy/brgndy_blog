import { createVar, style } from '@vanilla-extract/css';

export const background1 = createVar();

export const myStyle = style({
  vars: {
    [background1]: '#fff',
  },
  selectors: {
    '[data-theme="dark"] &': {
      vars: {
        [background1]: '#1e1e1e',
      },
    },
  },
});
