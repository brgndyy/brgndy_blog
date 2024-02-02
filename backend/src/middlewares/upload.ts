import multer from 'multer';
import fs from 'fs';
import PATH from '../constants/path/path';
import * as dotenv from 'dotenv';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

dotenv.config();

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
    console.log('Success', data);
  } catch (err) {
    console.error('Error', err);
  }
};

listObjects();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const filename = `${Date.now().toString()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});

export default upload;
