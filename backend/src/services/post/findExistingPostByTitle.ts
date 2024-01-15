import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import HttpError from '../../error/HttpError';
import { Post } from '../../models/posts';

const isExistingPostByTitle = async (title: string) => {
  try {
    const existingPost = await Post.findOne({
      where: {
        title: title,
      },
    });

    return existingPost ? true : false;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.not_found_post, 503);
  }
};

export default isExistingPostByTitle;
