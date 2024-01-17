import { style } from '@vanilla-extract/css';
import { slideIn } from '@/app/_styles/animation.css';

export const individualPostContainer = style({
  margin: '2rem 0',
  animation: `${slideIn} 0.3s ease forwards`,
});
