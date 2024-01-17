import React from 'react';
import Link from 'next/link';
import { PostItemPropsType } from 'types';
import Image from 'next/image';
import { BMHANNAAir, BMHAANAPro } from '@/app/_styles/fonts/fonts';
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
  date,
} from './postItem.css';
import Container from '../_composables/container/Container';

export default function PostItem({
  title,
  slug,
  description,
  thumbnailImageSrc,
  createdAt,
}: PostItemPropsType) {
  const formattedDate = formatDate(createdAt);

  return (
    <li className={itemListContainer}>
      <Link className={itemContainer} href={`/posts/${slug}`}>
        <Container className={imageContainer}>
          <Image
            src={`${process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL}${thumbnailImageSrc}`}
            width={200}
            height={200}
            alt="썸네일"
            className={thumbnailImage}
          />
        </Container>
        <Container className={infoContainer}>
          <Container className={titleContainer}>
            <h1 className={`${postTitle} ${BMHAANAPro.className} ${myStyle}`}>{title}</h1>
          </Container>

          <Container className={descriptionContainer}>
            <p className={`${postDescription} ${BMHANNAAir.className} ${myStyle}`}>{description}</p>
          </Container>
          <Container className={dateContainer}>
            <p className={`${date} ${BMHANNAAir.className} ${myStyle}`}>{formattedDate}</p>
          </Container>
        </Container>
      </Link>
    </li>
  );
}
