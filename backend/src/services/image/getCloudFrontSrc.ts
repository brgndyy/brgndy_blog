import uploadCompressedImageByKey from '../../utils/uploadCompressedImageByKey';
import * as dotenv from 'dotenv';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import HttpError from '../../error/HttpError';

dotenv.config();

// interface MulterS3File extends Express.Multer.File {
//   key?: string;
//   location?: string;
// }

// interface RequestWithFile extends Request {
//   file?: MulterS3File;
// }

const getCloudFrontSrc = async (req: any) => {
  try {
    if (!req.file || !req.file.key || !req.file.location) {
      throw new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);
    }

    const compressedImageKey = await uploadCompressedImageByKey(req.file.key, 768, 1366);

    const totalImageUrl = process.env.CLOUD_FRONT_URL + compressedImageKey;

    return totalImageUrl;
  } catch (err) {
    console.error(err);

    throw new HttpError(ERROR_MESSAGE.fail_get_image_from_s3, 503);
  }
};

export default getCloudFrontSrc;
