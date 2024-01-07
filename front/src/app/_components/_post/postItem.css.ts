import { style } from '@vanilla-extract/css';
import { text1 } from '@/app/_styles/vars.css';

export const itemListContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '30rem',
  height: '20rem',
  margin: 'auto',
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
  });

export const imageContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const thumbnailImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const infoContainer = style({
  margin: '1rem 0',
});

export const titleContainer = style({
  margin: '1rem 0',
});

export const postTitle = style({
  color: text1,
});

export const descriptionContainer = style({
  margin: '1rem 0',
});

export const postDescription = style({
  color: text1,
});

export const dateContainer = style({
  margin: '1rem 0',
});

export const date = style({
  color: text1,
});
