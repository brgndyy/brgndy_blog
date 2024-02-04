import { Post } from '../../models/posts';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import HttpError from '../../error/HttpError';

const createNewPost = async (
  postTitle: string,
  slug: string,
  thumbnailImageSrc: string,
  postDescription: string,
  postBodyContent: string,
) => {
  try {
    const createdNewPost = await Post.create({
      thumbnailImageSrc,
      title: postTitle,
      slug: slug,
      description: postDescription,
      body: postBodyContent,
      userId: 1,
    });

    if (!createdNewPost) {
      throw new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);
    }

    return createdNewPost;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);
  }
};

export default createNewPost;
