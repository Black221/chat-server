import { Router } from 'express';
import { createDeliverer, getDeliverer, getDelivererById, updateDeliverer, deleteDeliverer } from '../controllers';

const router = Router();

router.post('/', createDeliverer);
router.get('/', getDeliverer);
router.get('/:id', getDelivererById);
router.put('/:id', updateDeliverer);
router.delete('/:id', deleteDeliverer);

export default router;

