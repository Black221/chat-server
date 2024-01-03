import { createMessage, deleteMessage, getMessage, getMessages, replyMessage } from "@/controllers/message.controllers";
import { Router } from "express";


const router = Router();

router.get('/', getMessages);
router.get('/', getMessage);
router.post('/', createMessage);
router.post('/reply', replyMessage);
router.delete('/', deleteMessage);


export default router;