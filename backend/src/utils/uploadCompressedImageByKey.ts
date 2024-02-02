import * as dotenv from 'dotenv';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import sharp = require('sharp');

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

const uploadCompressedImageByKey = async (key: string) => {
  try {
    const compressedKey = `compressed_${key}`;

    const config = {
      Bucket: bucketName,
      Key: key,
    };

    let resizedConfig: any = {
      Bucket: bucketName,
      Key: compressedKey,
    };

    //기존 이미지 불러오기
    const imageData: any = await s3.send(new GetObjectCommand(config));

    // 이미지 리사이징
    const imageBuffer = await sharp(imageData.Body)
      .resize({ height: 1920, width: 1080 })
      .toBuffer();

    resizedConfig.Body = imageBuffer;

    // 리사이징한 이미지 업로드
    await s3.send(new PutObjectCommand(resizedConfig));

    // 기존에 있던 이미지는 삭제
    await s3.send(new DeleteObjectCommand(config));

    return compressedKey;
  } catch (error) {
    console.log('Get image by key from aws: ', error);
  }
};

export default uploadCompressedImageByKey;
