import multer from 'multer';
import fs from 'fs';
import PATH from '../constants/path/path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 폴더가 존재하지 않는 경우에 폴더 생성
    if (!fs.existsSync(PATH.image_url)) {
      fs.mkdirSync(PATH.image_url, { recursive: true });
    }

    cb(null, PATH.image_url);
  },
  filename: function (req, file, cb) {
    const decodedFilename = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const safeFilename = decodedFilename.replace(/\s/g, '-');

    cb(null, safeFilename);
  },
});

const postThumbnailImageUpload = multer({ storage: storage });

export default postThumbnailImageUpload;
