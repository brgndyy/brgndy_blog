'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PostStateType } from 'types';
import useFetch from '@/app/_hooks/useFetch';
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

  const postSubmitHandler = async () => {
    try {
      const res = await sendRequest();
    } catch (err) {}
  };

  return (
    <>
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
            <SubmitButtonSelection openSubmitFormHandler={openSubmitFormHandler} />
          </Container>
        </motion.div>
      )}
    </>
  );
}
