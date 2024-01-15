import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import HttpError from '../../error/HttpError';
import { Post } from '../../models/posts';

const updateExistingPost = async (
  postTitle: string,
  postSlug: string,
  thumbnailImageSrc: string,
  postDescription: string,
  postBodyContent: string,
) => {
  try {
    const post = await Post.findOne({ where: { title: postTitle } });

    if (!post) {
      throw new HttpError(ERROR_MESSAGE.not_found_post, 404);
    }

    // 게시글의 내용을 업데이트한다.
    post.slug = postSlug;
    post.thumbnailImageSrc = thumbnailImageSrc;
    post.description = postDescription;
    post.body = postBodyContent;

    await post.save();

    return post;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_update_post, 503);
  }
};

export default updateExistingPost;
