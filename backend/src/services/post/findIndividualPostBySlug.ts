import { Post } from '../../models/posts';
import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';

const findIndividualPostBySlug = async (slug: string) => {
  try {
    const foundPost = await Post.findOne({
      where: {
        slug: slug,
      },
    });

    if (!foundPost) {
      throw new HttpError(ERROR_MESSAGE.fail_get_individual_post, 503);
    }

    return foundPost;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_get_individual_post, 503);
  }
};

export default findIndividualPostBySlug;
