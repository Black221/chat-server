
import { Router } from 'express';

import { createClient, getClient, getClientById, updateClient, deleteClient } from '../controllers';

const router = Router();

router.post('/', createClient);
router.get('/', getClient);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;

