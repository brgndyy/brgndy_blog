import { WritePostFormContext } from './WritePostFormContext';
import React, { PropsWithChildren, useMemo } from 'react';
import useWritePost from '@/app/_hooks/useWritePost';
import { UseWritePostFormProps } from 'types';
import WritePostFormTitle from './WritePostFormTitle';
import WritePostFormContent from './WritePostFormContent';
import WritePostFormThumbnail from './WritePostFormThumbnail';
import WritePostFormDescription from './WritePostFormDescription';
import WritePostFormSubmitButton from './WritePostFormSubmitButton';
import WritePostFormInfoCard from './WritePostFormInfoCard';

export default function WritePostForm({
  children,
  title,
  description,
  body,
  accessToken,
  thumbnailImageSrc,
}: PropsWithChildren<UseWritePostFormProps>) {
  const {
    postState,
    postTitleHandler,
    appendImageToContent,
    postBodyHandler,
    postThumbnailImageHandler,
    postDescriptionHandler,
    postSubmitHandler,
  } = useWritePost({ title, description, body, accessToken, thumbnailImageSrc });

  const contextValue = useMemo(
    () => ({
      accessToken,
      postState,
      postTitleHandler,
      appendImageToContent,
      postBodyHandler,
      postThumbnailImageHandler,
      postDescriptionHandler,
      postSubmitHandler,
      thumbnailImageSrc,
    }),
    [
      accessToken,
      postState,
      postTitleHandler,
      appendImageToContent,
      postBodyHandler,
      postThumbnailImageHandler,
      postDescriptionHandler,
      postSubmitHandler,
      thumbnailImageSrc,
    ],
  );

  return (
    <WritePostFormContext.Provider value={contextValue}>{children}</WritePostFormContext.Provider>
  );
}

WritePostForm.Title = WritePostFormTitle;
WritePostForm.Content = WritePostFormContent;
WritePostForm.Thumbnail = WritePostFormThumbnail;
WritePostForm.Description = WritePostFormDescription;
WritePostForm.SubmitButton = WritePostFormSubmitButton;
WritePostForm.InfoCard = WritePostFormInfoCard;
