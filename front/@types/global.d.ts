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
}
