import { motion } from 'framer-motion';
import { TotalSubmitFormPropsType } from 'types';
import { totalSubmitFormContainer, thumbnailAndDescriptionContainer } from './totalSubmitForm.css';
import Container from '../_composables/container/Container';
import ThumbnailInput from './ThumbnailInput';
import PostDescription from './PostDescription';
import SubmitButtonSelection from './SubmitButtonSelection';

export default function TotalSubmitForm({
  isOpenSubmitForm,
  openSubmitFormHandler,
}: TotalSubmitFormPropsType) {
  return (
    <motion.div
      className={totalSubmitFormContainer}
      initial={{ y: '100vh' }}
      animate={{ y: isOpenSubmitForm ? 0 : '100vh' }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Container className={thumbnailAndDescriptionContainer}>
        <ThumbnailInput />
        <PostDescription />
        <SubmitButtonSelection openSubmitFormHandler={openSubmitFormHandler} />
      </Container>
    </motion.div>
  );
}
