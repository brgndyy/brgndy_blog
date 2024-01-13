import React, { useState } from 'react';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import CONFIG from '@/app/_constants/config';
import { AuthFormPropsType } from 'types';
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
  const [adminState, setAdminState] = useState({
    adminId: '',
    adminPassword: '',
  });

  const adminStateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAdminState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <form className={authForm}>
      <Container className={modalInputContainer}>
        <label className={`${inputLabel} ${myStyle}`} htmlFor="adminId">
          아이디
        </label>
        <Input
          value={adminState.adminId}
          onChange={adminStateHandler}
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
          value={adminState.adminPassword}
          onChange={adminStateHandler}
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
        />
      </Container>
    </form>
  );
}
