import useDragAndDrop from '@/app/_hooks/useDragAndDrop';
import { WritePostFormContext } from './WritePostFormContext';
import { useContext } from 'react';
import React from 'react';
import Image from 'next/image';
import Container from '../_composables/container/Container';
import { thumbnailInputContainer, drag } from '../_write/thumbnailInput.css';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import Input from '../_composables/input/Input';

export default function WritePostFormThumbnail() {
  const { postThumbnailImageHandler, thumbnailImageSrc } = useContext(WritePostFormContext);

  const {
    dragging,
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
      {thumbnailImageSrc && (
        <Image src={thumbnailImageSrc} width={100} height={100} alt="userImage" />
      )}

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
            className={`${thumbnailInputContainer} ${myStyle} ${BMHANNAAir.className}`}
          />
          <div className={`${myStyle} ${BMHANNAAir.className}`}>
            (업로드 된 파일이 없을시, 기본 이미지로 대체돼요!)
          </div>
        </div>
      </Container>
    </>
  );
}
