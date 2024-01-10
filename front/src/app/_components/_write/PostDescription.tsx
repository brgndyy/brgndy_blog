import { DescriptionContentPropsType } from 'types';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import Container from '../_composables/container/Container';
import { descriptionContainer, descriptionTextArea } from './postDescription.css';

export default function PostDescription({
  value,
  postDescriptionHandler,
}: DescriptionContentPropsType) {
  return (
    <Container className={descriptionContainer}>
      <textarea
        value={value}
        onChange={postDescriptionHandler}
        className={`${descriptionTextArea} ${myStyle} ${BMHANNAAir.className}`}
      />
    </Container>
  );
}
