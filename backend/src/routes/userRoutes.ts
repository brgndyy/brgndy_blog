import { Router } from 'express';
import signUpNewUser from '../controllers/signUpNewUser';
import userLogin from '../controllers/userLogin';
import sendNewAccessToken from '../controllers/sendNewAccessToken';
import sendUserInfo from '../controllers/sendUserInfo';
import verifyAccessToken from '../middlewares/verifyAccessToken';

const router = Router();

router.post('', signUpNewUser);
router.post('/login', userLogin);
router.post('/new-accees-token', sendNewAccessToken);
router.post('/info', verifyAccessToken, sendUserInfo);

export { router as userRoutes };
