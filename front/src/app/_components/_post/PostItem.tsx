import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { myStyle } from '@/app/_styles/vars.css';
import formatDate from '@/app/_utils/formatDate';
import {
  itemListContainer,
  itemContainer,
  imageContainer,
  thumbnailImage,
  infoContainer,
  titleContainer,
  postTitle,
  descriptionContainer,
  postDescription,
  dateContainer,
  dateText,
} from './postItem.css';
import Container from '../_composables/container/Container';

interface PostItemProps {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  slug: string;
}

export default function PostItem({ title, description, thumbnail, slug, date }: PostItemProps) {
  const formattedDate = formatDate(date);

  return (
    <li className={itemListContainer}>
      <Link className={itemContainer} href={`/posts/${slug}`}>
        <Container className={imageContainer}>
          <Image src={thumbnail} width={200} height={200} alt="썸네일" className={thumbnailImage} />
        </Container>
        <Container className={infoContainer}>
          <Container className={titleContainer}>
            <h1 className={`${postTitle}  ${myStyle}`}>{title}</h1>
          </Container>

          <Container className={descriptionContainer}>
            <p className={`${postDescription} ${myStyle}`}>{description}</p>
          </Container>
          <Container className={dateContainer}>
            <p className={`${dateText} ${myStyle}`}>{formattedDate}</p>
          </Container>
        </Container>
      </Link>
    </li>
  );
}
