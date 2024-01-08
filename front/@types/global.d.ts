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
    className: string;
  }

  export interface AdminLinkPropsType {
    path: string;
    title: string;
  }

  export interface InputPropsType {
    value?: string;
    onChange: () => void;
    type: string;
    className: string;
    placeholder?: string;
  }

  export interface ButtonPropsType {
    onClick?: () => void;
    type?: 'submit' | 'button' | 'reset';
    text: string;
    className: string;
  }

  export interface ButtonSelectionPropsType {
    openSubmitFormHandler: () => void;
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
}
