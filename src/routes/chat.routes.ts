
import { Router } from 'express';
import { createChat, getChat, getChatById, updateChat, deleteChat } from '../controllers';

const router = Router();

router.post('/', createChat);
router.get('/', getChat);
router.get('/:id', getChatById);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);


export default router;

