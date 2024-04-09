import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { PostStateType, UseWritePostFormProps } from 'types';
import useFetch from './useFetch';
import appendDataToFormData from '../_utils/appendDataToFormData';
import PATH_ROUTES from '../_constants/pathRoutes';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_FRONT_ENV_MODE === 'production'
    ? process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL
    : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

const useWritePost = ({ title, description, body, accessToken }: UseWritePostFormProps) => {
  const [postState, setPostState] = useState<PostStateType>({
    title: title || '',
    description: description || '',
    body: body || '',
    thumbnailImage: null,
  });
  const { sendRequest } = useFetch();
  const router = useRouter();

  const postTitleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setPostState((prevState) => ({ ...prevState, title: value }));
  };

  const appendImageToContent = (imageSrc: string) => {
    setPostState((prevState) => ({
      ...prevState,
      body: `${prevState.body}\n![](${imageSrc})`,
    }));
  };

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

  const postSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (postState.thumbnailImage) {
      appendDataToFormData(formData, {
        postTitle: typeof postState.title === 'string' ? postState.title : '',
        postDescription: postState.description,
        postBodyContent: postState.body,
        thumbnailImage: postState.thumbnailImage,
      });
    }

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
  };

  return {
    postState,
    postTitleHandler,
    appendImageToContent,
    postBodyHandler,
    postThumbnailImageHandler,
    postDescriptionHandler,
    postSubmitHandler,
  };
};

export default useWritePost;
