import { Request, Response, NextFunction } from 'express';
import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/messages/errorMessage';
import * as dotenv from 'dotenv';
import uploadCompressedImageByKey from '../utils/uploadCompressedImageByKey';
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
    if (!req.file || !req.file.key || !req.file.location) {
      throw new HttpError(ERROR_MESSAGE.fail_upload_image, 503);
    }

    const compressedImageKey = await uploadCompressedImageByKey(req.file.key, 1300, 1300);

    const totalImageUrl = process.env.CLOUD_FRONT_URL + compressedImageKey;

    res.status(200).json({ totalImageUrl });
  } catch (err) {
    console.error(err);
    const error = new HttpError(ERROR_MESSAGE.fail_upload_image, 503);
  }
};

export default uploadPostImage;
