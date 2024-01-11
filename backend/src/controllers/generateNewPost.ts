import ERROR_MESSAGE from '../constants/messages/errorMessage';
import HttpError from '../error/HttpError';
import { Request, Response, NextFunction } from 'express';
import formatThumbnailImagePath from '../services/post/formatThumbnailImagePath';
import createNewPost from '../services/post/createNewPost';

const generateNewPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);
    }
    const thumbnailImageSrc = formatThumbnailImagePath(req.file.path);

    console.log(thumbnailImageSrc);
    const slug = req.file.filename;
    const { postTitle, postDescription, postBodyContent } = req.body;

    await createNewPost(postTitle, slug, thumbnailImageSrc, postDescription, postBodyContent);

    return res.json({ success: true });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);

    return next(error);
  }
};

export default generateNewPost;
