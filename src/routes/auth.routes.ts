
import { Login, Register, RegisterExpert } from '@controllers/auth.controllers';
import { Router } from 'express';


const router = Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/register/expert', RegisterExpert);


export default router;

