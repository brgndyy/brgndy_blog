import { style } from '@vanilla-extract/css';
import { text1, text3 } from '@/app/_styles/vars.css';
import { slideIn } from '@/app/_styles/animation.css';

export const itemListContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  animation: `${slideIn} 0.3s ease-out`,
});

export const itemContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 20px',
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'translateY(-5px)',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 10px 20px',
  },
  margin: '1rem 0',
  width: '100%',
  borderRadius: '1rem',
});

export const imageContainer = style({
  width: '100%',
  height: '0',
  paddingBottom: '56.25%',
  position: 'relative',
});

export const thumbnailImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
  objectPosition: 'center center',
  top: '0',
  left: '0',
});

export const infoContainer = style({
  width: '100%',
  padding: '1rem',
});

export const titleContainer = style({
  margin: '1rem 0',
});

export const postTitle = style({
  color: text1,
  fontSize: '1.25rem',
});

export const descriptionContainer = style({
  margin: '1rem 0',
});

export const postDescription = style({
  color: text3,
  fontSize: '0.85rem',
});

export const dateContainer = style({
  margin: '1rem 0',
});

export const dateText = style({
  color: text3,
  fontSize: '0.75rem',
});
