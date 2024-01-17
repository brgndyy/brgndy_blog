import { keyframes } from '@vanilla-extract/css';

export const softAppear = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const slideIn = keyframes({
  from: {
    transform: 'translateX(-30px)',
    opacity: 0,
  },
  to: {
    transform: 'translateX(0)',
    opacity: 1,
  },
});

export const fadeIn = keyframes({
  '0%': {
    opacity: '0',
    transform: 'translateY(400px) scale(0.75)',
  },
  '75%': {
    opacity: '1',
    transform: 'translateY(-16px) scale(1)',
  },
  '100%': {
    opacity: '1',
    transform: 'translateY(0px)',
  },
});

export const fadeOut = keyframes({
  '0%': {
    opacity: '1',
    transform: 'translateY(0px)',
  },
  '75%': {
    opacity: '1',
    transform: 'translateY(-16px) scale(1)',
  },
  '100%': {
    opacity: '0',
    transform: 'translateY(400px) scale(0.75)',
  },
});
