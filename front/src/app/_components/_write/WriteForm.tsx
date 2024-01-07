'use client';

import { useState } from 'react';
import ContentSection from './ContentSection';
import TitleSection from './TitleSection';
import ButtonSection from './ButtonSection ';
import TotalSubmitForm from './TotalSubmitForm';

export default function WriteForm() {
  const [isOpenSubmitForm, setIsOpenSubmitForm] = useState(false);

  const openSubmitFormHandler = () => {
    setIsOpenSubmitForm(!isOpenSubmitForm);
  };

  return (
    <>
      <TitleSection />
      <ContentSection />
      <ButtonSection openSubmitFormHandler={openSubmitFormHandler} />
      {isOpenSubmitForm && (
        <TotalSubmitForm
          isOpenSubmitForm={isOpenSubmitForm}
          openSubmitFormHandler={openSubmitFormHandler}
        />
      )}
    </>
  );
}
