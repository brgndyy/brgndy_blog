import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import {
  totalSubmitFormContainer,
  thumbnailAndDescriptionContainer,
} from '../_write/writeForm.css';
import Container from '../_composables/container/Container';

interface WritePostFormInfoCardProps {
  isOpenSubmitForm: boolean;
}

export default function WritePostFormInfoCard({
  children,
  isOpenSubmitForm,
}: PropsWithChildren<WritePostFormInfoCardProps>) {
  return (
    <motion.div
      className={totalSubmitFormContainer}
      initial={{ y: '100vh' }}
      animate={{ y: isOpenSubmitForm ? 0 : '100vh' }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Container className={thumbnailAndDescriptionContainer}>{children}</Container>
    </motion.div>
  );
}
