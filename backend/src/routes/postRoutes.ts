import { Router } from 'express';
import getAllPosts from '../controllers/getAllPosts';

const router = Router();

router.get('', getAllPosts);

export { router as postRoutes };
