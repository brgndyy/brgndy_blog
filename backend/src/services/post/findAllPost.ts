import { Post } from '../../models/posts';
import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';

const findAllPost = async () => {
  try {
    const allPost = await Post.findAll({
      order: [['createdAt', 'DESC']],
    });

    if (!allPost) {
      throw new HttpError(ERROR_MESSAGE.not_found_post, 503);
    }

    return allPost;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.not_found_post, 503);
  }
};

export default findAllPost;
