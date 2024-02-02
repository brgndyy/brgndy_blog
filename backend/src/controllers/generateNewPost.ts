import ERROR_MESSAGE from '../constants/messages/errorMessage';
import HttpError from '../error/HttpError';
import { Request, Response, NextFunction } from 'express';
import formatThumbnailImagePath from '../services/post/formatThumbnailImagePath';
import createNewPost from '../services/post/createNewPost';
import isExistingPostByTitle from '../services/post/findExistingPostByTitle';
import updateExistingPost from '../services/post/updateExistingPost';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';

const generateNewPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new HttpError(ERROR_MESSAGE.fail_create_new_post, 503);
    }

    const bucketName = process.env.BUCKET_NAME || '';
    const bucketRegion = process.env.BUCKET_REGION || '';
    const accessKey = process.env.ACCESS_KEY || '';
    const secretAccessKey = process.env.SECRET_ACCESS_KEY || '';

    const s3 = new S3Client({
      region: bucketRegion,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
    });

    const listObjects = async () => {
      try {
        const data = await s3.send(
          new ListObjectsCommand({
            Bucket: bucketName,
          }),
        );
        console.log('Success!', data);
      } catch (err) {
        console.error('Error', err);
      }
    };

    listObjects();

    const thumbnailImageSrc = formatThumbnailImagePath(req.file.path);

    console.log('req.file : ', req.file.path);

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
