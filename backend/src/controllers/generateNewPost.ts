import ERROR_MESSAGE from '../constants/messages/errorMessage';
import HttpError from '../error/HttpError';
import { Request, Response, NextFunction } from 'express';
import formatThumbnailImagePath from '../services/post/formatThumbnailImagePath';
import createNewPost from '../services/post/createNewPost';
import isExistingPostByTitle from '../services/post/findExistingPostByTitle';
import updateExistingPost from '../services/post/updateExistingPost';
import uploadCompressedImageByKey from '../utils/uploadCompressedImageByKey';

interface User extends Request {
  id: number;
  userId: string;
  iat: number;
  exp: number;
}
interface MulterS3File extends Express.Multer.File {
  key?: string; // 파일이 저장될 때 S3에서 사용한 키
  location?: string; // S3에 저장된 파일의 전체 URL
}

// req 객체의 타입을 확장하는 커스텀 Request 인터페이스
interface RequestWithFile extends Request {
  file?: MulterS3File;
  user: User;
}

import * as dotenv from 'dotenv';

dotenv.config();

const generateNewPost = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.file || !req.file.key || !req.file.location) {
      throw new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);
    }

    if (!req.user) {
      throw new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);
    }

    await uploadCompressedImageByKey(req.file.key);

    const thumbnailImageSrc = req.file.location;

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
      await createNewPost(
        postTitle,
        postSlug,
        thumbnailImageSrc,
        postDescription,
        postBodyContent,
        req.user.id,
      );
    }

    return res.json({ success: true });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);

    return next(error);
  }
};

export default generateNewPost;
