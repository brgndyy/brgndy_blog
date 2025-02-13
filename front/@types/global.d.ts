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
    accept?: string;
    multiple?: boolean;
    ariaHidden?: boolean;
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

  export interface PostItemData {
    id: string;
    title: string;
    date: string;
    slug: string;
    description: string;
    thumbnail: string;
    content: string;
  }

  export interface IndividualPostItemType {
    id: number;
    thumbnailImageSrc: string;
    title: string;
    slug: string;
    description: string;
    body: string;
    userInfo: UserInfoType;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
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
    isAdmin: boolean;
    slug: string;
    createdAt: string;
  }

  export interface TitleContentPropsType {
    value: string;
    postTitleHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }

  export interface BodyContentPropsType {
    value: string;
    postBodyHandler: (value: string) => void;
    onDragEnterHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
    onDropHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  }

  export interface PostStateType {
    title: string;
    description: string;
    body: string;
    thumbnailImage: File | null;
  }

  export interface ThumnailInputPropsType {
    thumbnailImageSrc?: string;
    postThumbnailImageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  export interface DescriptionContentPropsType {
    value: string;
    postDescriptionHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }

  export interface ModalClassNamePropsType {
    className?: string;
  }

  export interface AuthFormPropsType {
    modalType: string;
  }

  export interface IndividualPostPropsType {
    isAdmin: boolean;
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

  interface AccessToken {
    accessToken: string;
  }

  export type UseWritePostFormProps = Pick<
    IndividualPostPropsType,
    'title' | 'description' | 'body' | 'thumbnailImageSrc'
  > &
    AccessToken;

  export interface DeleteModalPropsType {
    modalCloseHandler: () => void;
    // isModalClosing: boolean;
  }

  type FormDataValueType = File | string | boolean | number | Object;

  type FormDataEntryValue = FormDataValueType | FormDataValueType[];

  export interface FormDataObject {
    [key: string]: FormDataEntryValue;
  }
}
