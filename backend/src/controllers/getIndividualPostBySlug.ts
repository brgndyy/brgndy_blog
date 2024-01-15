import { Response, Request, NextFunction } from 'express';
import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/messages/errorMessage';
import findIndividualPostBySlug from '../services/post/findIndividualPostBySlug';
import findAdminUserInfo from '../services/auth/findAdminUserInfo';

const getIndividualPostBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug;

    const foundPost = await findIndividualPostBySlug(slug);

    if (!foundPost) {
      throw new HttpError(ERROR_MESSAGE.fail_get_individual_post, 404);
    }

    const plainPost = foundPost.get({ plain: true });

    const userInfo = await findAdminUserInfo(foundPost.userId);

    const plainUserInfo = userInfo.get({ plain: true });

    const postWithUserInfo = {
      ...plainPost,
      userInfo: plainUserInfo,
    };

    return res.json({ post: postWithUserInfo });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_get_individual_post, 503);

    return next(error);
  }
};

export default getIndividualPostBySlug;
