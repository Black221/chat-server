import { Router } from 'express';
import { createCommand, getCommand, getCommandById, updateCommand, deleteCommand } from '../controllers';

const router = Router();

router.post('/', createCommand);
router.get('/', getCommand);
router.get('/:id', getCommandById);
router.put('/:id', updateCommand);
router.delete('/:id', deleteCommand);

export default router;

