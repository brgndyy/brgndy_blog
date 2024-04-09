import { createContext } from 'react';
import { PostStateType } from 'types';

interface WritePostFormContextType {
  postState: PostStateType;
  postTitleHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  appendImageToContent: Function;
  postBodyHandler: (value: string) => void;
  postThumbnailImageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  postDescriptionHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  postSubmitHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  accessToken: string;
  thumbnailImageSrc: string;
}

export const WritePostFormContext = createContext<WritePostFormContextType>({
  postState: {
    title: '',
    description: '',
    body: '',
    thumbnailImage: null,
  },
  postTitleHandler: () => {},
  postDescriptionHandler: () => {},
  postBodyHandler: () => {},
  postThumbnailImageHandler: () => {},
  postSubmitHandler: () => {},
  appendImageToContent: () => {},
  accessToken: '',
  thumbnailImageSrc: '',
});
