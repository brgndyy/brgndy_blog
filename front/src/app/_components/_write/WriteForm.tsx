'use client';

import { useState } from 'react';
import { IndividualPostItemType } from 'types';
import ButtonSection from './ButtonSection ';
import WritePostForm from '../_writeform/WritePostForm';

export default function WriteForm({
  title,
  thumbnailImageSrc,
  description,
  body,
  accessToken,
}: IndividualPostItemType) {
  const [isOpenSubmitForm, setIsOpenSubmitForm] = useState(false);

  const openSubmitFormHandler = () => {
    setIsOpenSubmitForm(true);
  };

  const closeSubmitFormHandler = () => {
    setIsOpenSubmitForm(false);
  };

  return (
    <>
      <WritePostForm
        title={title}
        thumbnailImageSrc={thumbnailImageSrc}
        description={description}
        body={body}
        accessToken={accessToken}
      >
        <WritePostForm.Title />
        <WritePostForm.Content />
        <ButtonSection openSubmitFormHandler={openSubmitFormHandler} />
        {isOpenSubmitForm && (
          <WritePostForm.InfoCard isOpenSubmitForm={isOpenSubmitForm}>
            <WritePostForm.Thumbnail />
            <WritePostForm.Description />
            <WritePostForm.SubmitButton closeSubmitFormHandler={closeSubmitFormHandler} />
          </WritePostForm.InfoCard>
        )}
      </WritePostForm>
    </>
  );
}
