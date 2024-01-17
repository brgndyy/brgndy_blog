import React from 'react';
import { ThumnailInputPropsType } from 'types';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import useDragAndDrop from '@/app/_hooks/useDragAndDrop';
import Image from 'next/image';
import Container from '../_composables/container/Container';
import { thumbnailInputContainer, thumbnailInput, drag } from './thumbnailInput.css';
import Input from '../_composables/input/Input';

export default function ThumbnailInput({
  thumbnailImageSrc,
  postThumbnailImageHandler,
}: ThumnailInputPropsType) {
  const {
    dragging,
    previewUrl,
    onDragEnterHandler,
    onDragLeaveHandler,
    onDragOverHandler,
    onDropHandler,
    setFile,
  } = useDragAndDrop();

  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files ? e.target.files[0] : null;

    if (imageFile) {
      setFile(imageFile);
      postThumbnailImageHandler(e);
    }
  };

  return (
    <>
      {thumbnailImageSrc ||
        (previewUrl && (
          <Image
            src={
              thumbnailImageSrc
                ? `${process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL}${thumbnailImageSrc}`
                : previewUrl || ''
            }
            width={100}
            height={100}
            alt="userImage"
          />
        ))}

      <Container className={`${thumbnailInputContainer}${dragging ? drag : ''} ${myStyle}`}>
        <div
          className={` ${myStyle} ${BMHANNAAir.className}`}
          onDragEnter={onDragEnterHandler}
          onDragLeave={onDragLeaveHandler}
          onDragOver={onDragOverHandler}
          onDrop={onDropHandler}
        >
          <Input
            multiple={false}
            ariaHidden
            name="thumbnailImage"
            onChange={uploadImageHandler}
            type="file"
            className={`${thumbnailInput} ${myStyle} ${BMHANNAAir.className}`}
          />
          <div className={`${myStyle} ${BMHANNAAir.className}`}>
            (업로드 된 파일이 없을시, 기본 이미지로 대체돼요!)
          </div>
        </div>
      </Container>
    </>
  );
}
