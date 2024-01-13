import { Router } from 'express';
import signUpNewUser from '../controllers/signUpNewUser';
import userLogin from '../controllers/userLogin';
import sendNewAccessToken from '../controllers/sendNewAccessToken';

const router = Router();

router.post('', signUpNewUser);
router.post('/login', userLogin);
router.post('/new-accees-token', sendNewAccessToken);

export { router as userRoutes };
