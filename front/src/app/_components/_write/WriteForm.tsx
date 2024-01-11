'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PostStateType } from 'types';
import useFetch from '@/app/_hooks/useFetch';
import PATH_ROUTES from '@/app/_constants/pathRoutes';
import ERROR_MESSAGE from '@/app/_constants/errorMessage';
import ContentSection from './ContentSection';
import TitleSection from './TitleSection';
import ButtonSection from './ButtonSection ';
import Container from '../_composables/container/Container';
import { thumbnailAndDescriptionContainer, totalSubmitFormContainer } from './totalSubmitForm.css';
import ThumbnailInput from './ThumbnailInput';
import SubmitButtonSelection from './SubmitButtonSelection';
import PostDescription from './PostDescription';

export default function WriteForm() {
  const [isOpenSubmitForm, setIsOpenSubmitForm] = useState(false);
  const [postState, setPostState] = useState<PostStateType>({
    title: '',
    description: '',
    body: '',
    thumbnailImage: null,
  });
  const { isLoading, sendRequest } = useFetch();

  const postTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPostState((prevState) => ({ ...prevState, title: value }));
  };

  const postBodyHandler = useCallback((value: string) => {
    setPostState((prevState) => ({ ...prevState, body: value }));
  }, []);

  const postThumbnailImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPostState((prevState) => ({
        ...prevState,
        thumbnailImage: file,
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

    try {
      const res = await sendRequest(
        `${process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL}${PATH_ROUTES.write_new_post}`,
        formData,
        {},
        'POST',
      );

      const data = await res.json();

      console.log(data);
    } catch (err) {
      throw new Error(ERROR_MESSAGE.fail_write_new_post);
    }
  };

  return (
    <>
      {isLoading && <div>로딩중입니다!</div>}
      <TitleSection value={postState.title} postTitleHandler={postTitleHandler} />
      <ContentSection value={postState.body} postBodyHandler={postBodyHandler} />
      <ButtonSection openSubmitFormHandler={openSubmitFormHandler} />
      {isOpenSubmitForm && (
        <motion.div
          className={totalSubmitFormContainer}
          initial={{ y: '100vh' }}
          animate={{ y: isOpenSubmitForm ? 0 : '100vh' }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <Container className={thumbnailAndDescriptionContainer}>
            <ThumbnailInput postThumbnailImageHandler={postThumbnailImageHandler} />
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
