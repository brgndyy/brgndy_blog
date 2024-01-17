import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import HttpError from '../../error/HttpError';
import { Post } from '../../models/posts';

const deletePostFromDataBySlug = async (slug: string) => {
  try {
    await Post.destroy({
      where: {
        slug: slug,
      },
    });
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_delete_post, 503);
  }
};

export default deletePostFromDataBySlug;
