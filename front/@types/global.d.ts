declare module 'types' {
  export interface HeaderLinkItemPropsType {
    title: string;
    path: string;
    icon?: React.ReactNode;
    isOpenNewPage: boolean;
  }

  export interface HeaderPropsType {
    isAdmin: boolean;
  }

  export interface WrapperPropsType {
    className?: string;
  }

  export interface AdminLinkPropsType {
    path: string;
    title: string;
  }

  export interface InputPropsType {
    value?: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    className: string;
    placeholder?: string;
    name: string;
    autoComplete?: 'on' | 'off';
  }

  export interface ButtonPropsType {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'submit' | 'button' | 'reset';
    text: string;
    className: string;
  }

  export interface ButtonSelectionPropsType {
    openSubmitFormHandler: () => void;
    postSubmitHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }

  export interface TotalSubmitFormPropsType {
    isOpenSubmitForm: boolean;
    openSubmitFormHandler: () => void;
  }

  export interface UserInfoType {
    id: number;
    userId: string;
    userName: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export interface PostItemType {
    id: number;
    thumbnailImageSrc: string;
    title: string;
    slug: string;
    description: string;
    body: string;
    userInfo: UserInfoType;
    createdAt: string;
    updatedAt: string;
  }

  export interface PostListPropsType {
    allPosts: PostItemType[];
  }

  export interface PostItemPropsType {
    thumbnailImageSrc: string;
    title: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface PostBodyPropsType {
    body: string;
  }

  export interface PostInfoPropsType {
    createdAt: string;
  }

  export interface TitleContentPropsType {
    value: string;
    postTitleHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  export interface BodyContentPropsType {
    value: string;
    postBodyHandler: (value: string) => void;
  }

  export interface PostStateType {
    title: string;
    description: string;
    body: string;
    thumbnailImage: File | null;
  }

  export interface ThumnailInputPropsType {
    postThumbnailImageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  export interface DescriptionContentPropsType {
    value: string;
    postDescriptionHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }

  export interface ModalClassNamePropsType {
    className?: string;
  }

  export interface ModalClosePropsType {
    className?: string;
    onClick?: () => void;
  }

  export interface AuthModalPropsType {
    modalCloseHandler: () => void;
    modalType: string;
    isModalClosing: boolean;
  }

  export interface AuthFormPropsType {
    modalType: string;
  }
}
