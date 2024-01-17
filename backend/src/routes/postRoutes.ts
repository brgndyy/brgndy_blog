import { Router } from 'express';
import getAllPosts from '../controllers/getAllPosts';
import getIndividualPostBySlug from '../controllers/getIndividualPostBySlug';
import generateNewPost from '../controllers/generateNewPost';
import postThumbnailImageUpload from '../middlewares/postThumbnailImageUpload';
import sendPostThumbnailImage from '../controllers/sendPostThumbnailImage';
import deletePostBySlug from '../controllers/deletePostBySlug';

const router = Router();

router.get('/:slug', getIndividualPostBySlug);
router.get('', getAllPosts);
router.post('', postThumbnailImageUpload.single('thumbnailImage'), generateNewPost);
router.post('/thumbnail-image', sendPostThumbnailImage);
router.delete('/:slug', deletePostBySlug);

export { router as postRoutes };
