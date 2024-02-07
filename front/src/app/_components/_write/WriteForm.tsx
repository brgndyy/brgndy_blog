'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PostStateType, IndividualPostItemType } from 'types';
import useFetch from '@/app/_hooks/useFetch';
import PATH_ROUTES from '@/app/_constants/pathRoutes';
import ERROR_MESSAGE from '@/app/_constants/errorMessage';
import { useRouter } from 'next/navigation';
import useDragAndDrop from '@/app/_hooks/useDragAndDrop';
import ContentSection from './ContentSection';
import TitleSection from './TitleSection';
import ButtonSection from './ButtonSection ';
import Container from '../_composables/container/Container';
import { thumbnailAndDescriptionContainer, totalSubmitFormContainer } from './writeForm.css';
import ThumbnailInput from './ThumbnailInput';
import SubmitButtonSelection from './SubmitButtonSelection';
import PostDescription from './PostDescription';
import TagListSection from './TagListSection';

export default function WriteForm({
  title,
  thumbnailImageSrc,
  description,
  body,
  accessToken,
}: IndividualPostItemType) {
  const [isOpenSubmitForm, setIsOpenSubmitForm] = useState(false);
  const [postState, setPostState] = useState<PostStateType>({
    title: title || '',
    description: description || '',
    body: body || '',
    thumbnailImage: null,
  });
  const { isLoading, sendRequest } = useFetch();
  const router = useRouter();
  const { onDragEnterHandler, onDragLeaveHandler, onDragOverHandler, onDropHandler, file } =
    useDragAndDrop();

  const postTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPostState((prevState) => ({ ...prevState, title: value }));
  };

  const appendImageToContent = (imageSrc: string) => {
    setPostState((prevState) => ({
      ...prevState,
      body: `${prevState.body}\n![](${imageSrc})`,
    }));
  };

  useEffect(() => {
    const uploadFileToServer = async () => {
      if (file && !isLoading) {
        const formData = new FormData();

        formData.append('image', file);

        const BACKEND_URL =
          process.env.NEXT_PUBLIC_FRONT_ENV_MODE === 'production'
            ? process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL
            : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

        const res = await sendRequest(
          `${BACKEND_URL}${PATH_ROUTES.upload_image}`,
          formData,
          {
            Authorization: `Bearer ${accessToken}`,
          },
          'POST',
        );

        const data = await res.json();

        const { totalImageUrl } = data;

        appendImageToContent(totalImageUrl);
      }
    };

    uploadFileToServer();
  }, [file, accessToken]);

  const postBodyHandler = useCallback((value: string) => {
    setPostState((prevState) => ({ ...prevState, body: value }));
  }, []);

  const postThumbnailImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnailFile = e.target.files ? e.target.files[0] : null;
    if (thumbnailFile) {
      setPostState((prevState) => ({
        ...prevState,
        thumbnailImage: thumbnailFile,
      }));
    }
  };

  const postDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setPostState((prevState) => ({ ...prevState, description: value }));
  };

  const openSubmitFormHandler = () => {
    setIsOpenSubmitForm(!isOpenSubmitForm);
  };

  const postSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('postTitle', typeof postState.title === 'string' ? postState.title : '');
    formData.append('postDescription', postState.description);
    formData.append('postBodyContent', postState.body);

    if (postState.thumbnailImage instanceof File) {
      formData.append('thumbnailImage', postState.thumbnailImage);
    }

    const BACKEND_URL =
      process.env.NEXT_PUBLIC_FRONT_ENV_MODE === 'production'
        ? process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL
        : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

    try {
      const res = await sendRequest(
        `${BACKEND_URL}${PATH_ROUTES.write_new_post}`,
        formData,
        {
          Authorization: `Bearer ${accessToken}`,
        },
        'POST',
      );

      const data = await res.json();

      const { success } = data;

      if (success) {
        router.refresh();
        router.push('/');
      }
    } catch (err) {
      throw new Error(ERROR_MESSAGE.fail_write_new_post);
    }
  };

  return (
    <>
      {isLoading && <div>로딩중입니다!</div>}
      <TitleSection value={postState.title} postTitleHandler={postTitleHandler} />
      <TagListSection />
      <ContentSection
        value={postState.body}
        onDropHandler={onDropHandler}
        onDragEnterHandler={onDragEnterHandler}
        onDragLeaveHandler={onDragLeaveHandler}
        onDragOverHandler={onDragOverHandler}
        postBodyHandler={postBodyHandler}
      />
      <ButtonSection openSubmitFormHandler={openSubmitFormHandler} />
      {isOpenSubmitForm && (
        <motion.div
          className={totalSubmitFormContainer}
          initial={{ y: '100vh' }}
          animate={{ y: isOpenSubmitForm ? 0 : '100vh' }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <Container className={thumbnailAndDescriptionContainer}>
            <ThumbnailInput
              thumbnailImageSrc={thumbnailImageSrc}
              postThumbnailImageHandler={postThumbnailImageHandler}
            />
            <PostDescription
              value={postState.description}
              postDescriptionHandler={postDescriptionHandler}
            />
            <SubmitButtonSelection
              postSubmitHandler={postSubmitHandler}
              openSubmitFormHandler={openSubmitFormHandler}
            />
          </Container>
        </motion.div>
      )}
    </>
  );
}
