
import { getUserDiscussions } from '@controllers/discussion.controllers';
import { getUser, getUsers, updatePassword, updatePhoneNumber, getRondomExpert, updateUserRole } from '@controllers/user.controllers';
import { Router } from 'express';

const router = Router();


router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/:id/discussions', getUserDiscussions);
router.get('/expert/:userId', getRondomExpert);
router.put('/:id/change/role', updateUserRole);
router.put('/:id/change/phone_number', updatePhoneNumber);
router.put('/:id/change/password', updatePassword);



export default router;

