import * as dotenv from 'dotenv';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import sharp = require('sharp');
import { Readable } from 'nodemailer/lib/xoauth2';
import ERROR_MESSAGE from '../constants/messages/errorMessage';

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

const streamToBuffer = async (stream: Readable | ReadableStream | Blob): Promise<Buffer> => {
  if (stream instanceof Readable) {
    // Node.js Readable 스트림인 경우
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  } else {
    throw new Error('스트림타입이 일차하지 않아요');
  }
};

const uploadCompressedImageByKey = async (key: string, height: number, width: number) => {
  try {
    const compressedKey = `compressed_${key}`;

    const config = {
      Bucket: bucketName,
      Key: key,
    };

    // S3에서 이미지 불러오기
    const { Body } = await s3.send(new GetObjectCommand(config));
    if (!Body) throw new Error(ERROR_MESSAGE.fail_get_image_from_s3);

    // 스트림을 버퍼로 변환
    const buffer = await streamToBuffer(Body);

    // 이미지 리사이징
    const imageBuffer = await sharp(buffer)
      .resize({
        height: height,
        width: width,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .ensureAlpha()
      .toFormat('png')
      .toBuffer();

    // 리사이징한 이미지 업로드
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: compressedKey,
        Body: imageBuffer,
        ContentType: 'image/png',
      }),
    );

    // 기존 이미지 삭제
    await s3.send(new DeleteObjectCommand(config));

    return compressedKey;
  } catch (error) {
    console.error('이미지를 찾는데에 에러가 발생한 key', error);
    throw error; // 오류를 더 상위로 전파
  }
};

export default uploadCompressedImageByKey;
