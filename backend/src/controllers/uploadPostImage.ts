import { Request, Response, NextFunction } from 'express';
import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/messages/errorMessage';
import * as dotenv from 'dotenv';
import uploadCompressedImageByKey from '../utils/uploadCompressedImageByKey';
import getCloudFrontSrc from '../services/image/getCloudFrontSrc';
dotenv.config();

interface MulterS3File extends Express.Multer.File {
  key?: string; // 파일이 저장될 때 S3에서 사용한 키
  location?: string; // S3에 저장된 파일의 전체 URL
}

// req 객체의 타입을 확장하는 커스텀 Request 인터페이스
interface RequestWithFile extends Request {
  file?: MulterS3File;
}

const uploadPostImage = async (req: RequestWithFile, res: Response, next: NextFunction) => {
  try {
    const totalImageUrl = await getCloudFrontSrc(req);

    res.status(200).json({ totalImageUrl });
  } catch (err) {
    console.error(err);
    const error = new HttpError(ERROR_MESSAGE.fail_upload_image, 503);

    return next(error);
  }
};

export default uploadPostImage;
