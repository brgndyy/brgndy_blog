import { Response, Request, NextFunction } from 'express';
import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/messages/errorMessage';
import findAllPost from '../services/post/findAllPost';
import findAdminUserInfo from '../services/auth/findAdminUserInfo';

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allPost = await findAllPost();

    const allPostWithUserInfo = await Promise.all(
      allPost.map(async (post) => {
        const userInfo = await findAdminUserInfo(post.userId);

        // Sequelize 인스턴스에서 필요한 데이터만 추출
        const plainPost = post.get({ plain: true });
        return {
          ...plainPost,
          userInfo,
        };
      }),
    );

    return res.json({ allPost: allPostWithUserInfo ? allPostWithUserInfo : [] });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_get_all_post, 503);

    return next(error);
  }
};

export default getAllPosts;
