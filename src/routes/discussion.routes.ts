import { addUser, createDiscussion, getDiscussion, getDiscussionMembers, getDiscussionMessages, getDiscussions, removeUser } from "@/controllers/discussion.controllers";
import { Router } from "express";


const router = Router();

router.get('/', getDiscussions);
router.get('/:id', getDiscussion);
router.get('/:id/members', getDiscussionMembers);
router.get('/:id/messages', getDiscussionMessages);
router.post('/', createDiscussion);
router.post('/:id/add', addUser);
router.post('/:id/remove', removeUser);

export default router;