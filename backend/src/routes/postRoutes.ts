import { Router } from 'express';
import getAllPosts from '../controllers/getAllPosts';
import getIndividualPostBySlug from '../controllers/getIndividualPostBySlug';

const router = Router();

router.get('/:slug', getIndividualPostBySlug);
router.get('', getAllPosts);

export { router as postRoutes };
