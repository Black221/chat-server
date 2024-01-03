import express, { Router } from "express";
import path from "path";
import DiscussionRouter from "@routes/discussion.routes";
import UserRouter from "@routes/user.routes";
import AuthRouter from "@routes/auth.routes";
import NotebookRouter from "@routes/notebook.routes";
import MessageRouter from "@routes/message.routes";


const routes = Router();


routes.use('/discussions', DiscussionRouter);
routes.use('/users', UserRouter);
routes.use('/auth', AuthRouter);
routes.use('/notebooks', NotebookRouter);
routes.use('/messages', MessageRouter);

// static routes
routes.use(express.static(path.join(__dirname, 'public')));

export default routes;