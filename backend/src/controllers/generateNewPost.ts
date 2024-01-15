import ERROR_MESSAGE from '../constants/messages/errorMessage';
import HttpError from '../error/HttpError';
import { Request, Response, NextFunction } from 'express';
import formatThumbnailImagePath from '../services/post/formatThumbnailImagePath';
import createNewPost from '../services/post/createNewPost';
import isExistingPostByTitle from '../services/post/findExistingPostByTitle';
import updateExistingPost from '../services/post/updateExistingPost';

const generateNewPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);
    }
    const thumbnailImageSrc = formatThumbnailImagePath(req.file.path);

    const { postTitle, postDescription, postBodyContent } = req.body;

    const postSlug = postTitle.replace(/[ ?!]/g, '-');

    const isExistingPost = await isExistingPostByTitle(postTitle);

    if (isExistingPost) {
      await updateExistingPost(
        postTitle,
        postSlug,
        thumbnailImageSrc,
        postDescription,
        postBodyContent,
      );
    } else {
      await createNewPost(postTitle, postSlug, thumbnailImageSrc, postDescription, postBodyContent);
    }

    return res.json({ success: true });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);

    return next(error);
  }
};

export default generateNewPost;
