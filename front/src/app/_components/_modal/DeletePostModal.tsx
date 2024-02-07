import React from 'react';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import useFetch from '@/app/_hooks/useFetch';
import ERROR_MESSAGE from '@/app/_constants/errorMessage';
import PATH_ROUTES from '@/app/_constants/pathRoutes';
import { useParams, useRouter } from 'next/navigation';
import { closeButton } from './authModal.css';
import { modalContainer, modalText, deleteButton } from './deletePostModal.css';
import Modal from './Modal';
import Container from '../_composables/container/Container';
import Button from '../_composables/button/Button';

export default function DeletePostModal() {
  const { sendRequest } = useFetch();
  const { slug } = useParams<{ slug: string }>();
  const decodedURIComponent = decodeURIComponent(slug);
  const router = useRouter();

  const deletePostHandler = async () => {
    const BACKEND_URL =
      process.env.NEXT_PUBLIC_FRONT_ENV_MODE === 'production'
        ? process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL
        : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

    try {
      const res = await sendRequest(
        `${BACKEND_URL}${PATH_ROUTES.delete_post(decodedURIComponent)}`,
        null,
        {},
        'DELETE',
      );

      const data = await res.json();

      const { success } = data;

      if (success) {
        router.replace('/');
      }
    } catch (err) {
      throw new Error(ERROR_MESSAGE.fail_delete_post);
    }
  };

  return (
    <Modal.Portal id="modal">
      <Modal.Backdrop>
        <Modal.Container className={`${modalContainer} ${BMHANNAAir.className}`}>
          <Modal.Close className={`${closeButton} ${myStyle} ${BMHANNAAir.className}`}>
            X
          </Modal.Close>
          <Container className={`${myStyle}`}>
            <p className={`${modalText} ${myStyle} ${BMHANNAAir.className}`}>
              정말 삭제하시겠습니까? 삭제하시면 복구는 불가능합니다.
            </p>
          </Container>
          <Container>
            <Button
              text="삭제하기"
              className={`${myStyle} ${BMHANNAAir.className} ${deleteButton}`}
              onClick={deletePostHandler}
            />
          </Container>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Portal>
  );
}
