import { DescriptionContentPropsType } from 'types';
import { myStyle } from '@/app/_styles/vars.css';
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
        placeholder="글의 짧은 간략한 설명을 입력하세요"
        onChange={postDescriptionHandler}
        className={`${descriptionTextArea} ${myStyle}`}
      />
    </Container>
  );
}
