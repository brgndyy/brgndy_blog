import { Router } from 'express';
import getAllPosts from '../controllers/getAllPosts';
import getIndividualPostBySlug from '../controllers/getIndividualPostBySlug';
import generateNewPost from '../controllers/generateNewPost';
import upload from '../middlewares/upload';
import deletePostBySlug from '../controllers/deletePostBySlug';
import verifyAccessToken from '../middlewares/verifyAccessToken';

const router = Router();

router.get('/:slug', getIndividualPostBySlug);
router.get('', getAllPosts);
router.post(
  '',
  verifyAccessToken,
  (req, res, next) => {
    upload.single('thumbnailImage')(req, res, (err) => {
      if (err) {
        // 에러 로깅
        console.error('Upload Error:', err);
        return res.status(500).json({ error: err.message });
      }
      next();
    });
  },
  generateNewPost,
);
router.delete('/:slug', deletePostBySlug);

export { router as postRoutes };
