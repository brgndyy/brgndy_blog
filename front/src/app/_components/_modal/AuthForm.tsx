import React from 'react';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import CONFIG from '@/app/_constants/config';
import { AuthFormPropsType } from 'types';
import useInput from '@/app/_hooks/useInput';
import useFetch from '@/app/_hooks/useFetch';
import PATH_ROUTES from '@/app/_constants/pathRoutes';
import { useRouter } from 'next/navigation';
import sendTokenCookieToHandler from '@/app/_services/sendTokenCookieToHandler';
import {
  modalInput,
  modalInputContainer,
  inputLabel,
  modalButton,
  authForm,
} from './authModal.css';
import Container from '../_composables/container/Container';
import Input from '../_composables/input/Input';
import Button from '../_composables/button/Button';

export default function AuthForm({ modalType }: AuthFormPropsType) {
  const router = useRouter();

  const { inputState, inputStateHandler } = useInput({
    adminId: '',
    adminPassword: '',
  });

  const { sendRequest } = useFetch();

  const formSubmitHandler = async () => {
    const url = `${process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL}${
      modalType === CONFIG.modal_login_type ? PATH_ROUTES.login_user : PATH_ROUTES.sign_up_user
    }`;

    const res = await sendRequest(
      url,
      JSON.stringify({
        userId: inputState.adminId,
        userPassword: inputState.adminPassword,
      }),
      {
        'Content-Type': 'application/json',
      },
      'POST',
    );

    const data = await res.json();

    const { success } = data;

    if (success) {
      const { accessTokenValue, refreshTokenValue } = data;

      await sendTokenCookieToHandler(accessTokenValue, refreshTokenValue);

      router.refresh();
      router.push('/');
    }
  };

  return (
    <form className={authForm} onSubmit={formSubmitHandler}>
      <Container className={modalInputContainer}>
        <label className={`${inputLabel} ${myStyle}`} htmlFor="adminId">
          아이디
        </label>
        <Input
          value={inputState.adminId}
          onChange={inputStateHandler}
          type="text"
          className={`${modalInput} ${BMHANNAAir.className}`}
          autoComplete="off"
          name="adminId"
        />
      </Container>
      <Container className={modalInputContainer}>
        <label className={`${inputLabel} ${myStyle}`} htmlFor="adminPassword">
          비밀번호
        </label>
        <Input
          value={inputState.adminPassword}
          onChange={inputStateHandler}
          type="password"
          className={`${modalInput} ${BMHANNAAir.className}`}
          autoComplete="off"
          name="adminPassword"
        />
      </Container>
      <Container>
        <Button
          className={`${modalButton} ${myStyle} ${BMHANNAAir.className}`}
          text={modalType === CONFIG.modal_login_type ? '로그인하기' : '회원가입하기'}
          onClick={formSubmitHandler}
        />
      </Container>
    </form>
  );
}
