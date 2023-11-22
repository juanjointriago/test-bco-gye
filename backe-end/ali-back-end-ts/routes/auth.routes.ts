import { Router } from 'express';
import { refreshToken, signIn, signOut, signUp } from '../controllers/auth.controller';

const router = Router();


router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/signout', signOut);
router.post('/refresh-token', refreshToken);


export default router;
