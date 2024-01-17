import ERROR_MESSAGE from '../constants/messages/errorMessage';
import HttpError from '../error/HttpError';
import { Response, Request, NextFunction } from 'express';
import deletePostFromDataBySlug from '../services/post/deletePostFromDataBySlug';

const deletePostBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug;

    const decodedSlug = decodeURIComponent(slug);

    await deletePostFromDataBySlug(decodedSlug);

    return res.json({ success: true });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_delete_post, 503);

    return next(error);
  }
};

export default deletePostBySlug;
