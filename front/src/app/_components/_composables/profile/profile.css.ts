import { style } from '@vanilla-extract/css';
import { slideIn } from '@/app/_styles/animation.css';

export const profileContainer = style({
  display: 'flex',
  marginTop: '2rem',
  justifyContent: 'center',
  animation: `${slideIn} 0.3s ease forwards`,

  '@media': {
    'screen and (max-width: 767px)': {
      flexDirection: 'column',
    },
  },
});
