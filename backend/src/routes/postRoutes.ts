import { Router } from 'express';
import getAllPosts from '../controllers/getAllPosts';
import getIndividualPostBySlug from '../controllers/getIndividualPostBySlug';
import generateNewPost from '../controllers/generateNewPost';
import postThumbnailImageUpload from '../middlewares/postThumbnailImageUpload';

const router = Router();

router.get('/:slug', getIndividualPostBySlug);
router.get('', getAllPosts);
router.post('', postThumbnailImageUpload.single('thumbnailImage'), generateNewPost);

export { router as postRoutes };
